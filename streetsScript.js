let hero = {
    hp:100,
    rep:0,
    coins:3,
    dmg:5,
    speed:1000,
}

let locationHero;

let day = 1;
let deposit = 0;
let needWood;
let clickWood = 0;
let correctAnswers = 0;

let enemy;

let priceUpgrade = 5;

let loopCount = 0;
let forestLoopCount = 0;
let animSpeed = 0.3;

btnClose()
document.getElementById("hub").style.display = "block";

//-------------------------------------------Музыка--------------------------------
let audio = document.getElementById('background-music');
// Функция для отслеживания активности вкладки
let hasFocus = true;

// Обработчики событий для отслеживания фокуса
window.addEventListener('focus', () => {
    hasFocus = true;
    audio.play();
});

window.addEventListener('blur', () => {
    hasFocus = false;
    audio.pause();
});

let musicOnOfF = 0;
function musicPlay(){
    if (musicOnOfF == 0 || window.focus()){
        audio.play();
        musicOnOfF=1;
    }else if(musicOnOfF == 1 || window.blur()){
        audio.pause()
        musicOnOfF=0;
    }
};


//------------------------------------------Анимация---------------------------------------------
function startElementAnimation(id1) {
    document.getElementById("textBox").style.transition = "opacity "+animSpeed+"s ease";
    document.getElementById("textBox").style.opacity = '0';
    document.getElementById("charImg").style.transition = "opacity "+animSpeed+"s ease";
    document.getElementById("charImg").style.opacity = '0';
    document.getElementById(id1).style.transition = "opacity "+animSpeed+"s ease";
    document.getElementById(id1).style.opacity = '0';
}

function endElementAnimation(id1) {
    document.getElementById("textBox").style.transition = "opacity "+animSpeed+"s ease";
    document.getElementById("textBox").style.opacity = '1';
    document.getElementById("charImg").style.transition = "opacity "+animSpeed+"s ease";
    document.getElementById("charImg").style.opacity = '1';
    document.getElementById(id1).style.transition = "opacity "+animSpeed+"s ease";
    document.getElementById(id1).style.opacity = '1';
}

function enemyReaction(){
    document.getElementById("charImg").classList.remove("startEnemyAnimation");
    requestAnimationFrame(() => {
        document.getElementById("charImg").classList.add("startEnemyAnimation");
    });
}
// ----------------------------------------- Боевка---------------------------------------------
//Смерть персонажа
function death(){
    locationHero = "tavern"
    outOfBattle()
    btnClose()
    loopCount = 5
    day++
    deposit += Math.floor(deposit * 2 /100*10)/10
    document.getElementById("depositSum").innerText = deposit;
    if (hero.hp<=0){
        startEvent("healer", "https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/healer.png", '"О, очнулся! Еле выходил. В следующий раз будь осторожнее." Вы потеряли половину денег.',0,0,0)
        hero.coins*=0.5;
        document.getElementById("plusHp").disabled = ggBeggar(hero.coins,7);
        hero.hp = 60;
        rewriteStats();
        setTimeout(() => {
            document.getElementById("backTavern").style.display = "block";
        }, animSpeed*2000);
    }
}

//Выход из сражения, визуально возвращение сцены в исходное состояние
function outOfBattle(){
    document.getElementById("textBox").style.display = "block";
    document.getElementById("battleScene").style.display = "none";
    if (window.matchMedia("(max-width: 700px)").matches){
        document.getElementById("charImg").style.width = "55vw";
        document.getElementById("charImg").style.height = "55vw";
    }else{
        document.getElementById("charImg").style.width = "15vw";
        document.getElementById("charImg").style.height = "15vw";
    }
    document.getElementById("charImg").style.backgroundRepeat = "no-repeat";
    document.getElementById("charImg").style.backgroundPosition = "center";
    document.getElementById("charImg").style.backgroundSize = "contain";
}

// если параметр enemy пустая строка "", появляется случайный враг из списка
function findFight(enemyPar){
    btnClose()
    document.getElementById("fightForest").style.display = "block";
    document.getElementById("runFightDisabled").style.display = "block";
    document.getElementById("runFightDisabled").disabled = false;

    if (enemyPar==""){
        if (forestLoopCount>0 && forestLoopCount<10){
            let enemyList = [spider, rat, dog]
            let randNum = Math.floor(Math.random()*enemyList.length)
            enemy = enemyList[randNum]
        }else if (forestLoopCount>=10 && forestLoopCount<20){
            let enemyList = [spider, dog, disertir]
            let randNum = Math.floor(Math.random()*enemyList.length)
            enemy = enemyList[randNum]
        }else if (forestLoopCount>=20 && forestLoopCount<30){
            let enemyList = [disertir, robber, skeleton]
            let randNum = Math.floor(Math.random()*enemyList.length)
            enemy = enemyList[randNum]
        }

    }else{
        enemy = enemyPar
    }
    console.log("Враг хп"+enemy.hp)
    document.getElementById("enemyHp").innerText = enemy.hp + " из " + enemy.hpMax;
    startEvent("fightForest","images/forest/forestBg.jpg", enemy.img1, "На вас набрасывается "+enemy.name,0,0,0)
}

function runFight(){
    let chance = Math.floor(Math.random()*2)
    if (chance==0){
        document.getElementById("runFightDisabled").disabled = true;
    }else{
        if (locationHero=="forest"){
            forestEvent()
        }else if(locationHero=="town"){
            rndEvent()
        }else if(locationHero=="tavern"){
            goTavern()
        }
    }
}

//появление сцены с битвой + атака врага
function fightScene(){
    document.getElementById("textBox").style.display = "none";
    document.getElementById("fightForest").style.display = "none";
    document.getElementById("battleScene").style.display = "block";
    document.getElementById("charImg").style.width = "60%";
    document.getElementById("charImg").style.height = "62%";
    document.getElementById("charImg").style.backgroundRepeat = "no-repeat";
    document.getElementById("charImg").style.backgroundPosition = "center";
    document.getElementById("charImg").style.backgroundSize = "contain";

    enemy.attack()
}

// атака главного героя
function attack(){
    enemy.hp -= hero.dmg;
    console.log("Враг хп"+enemy.hp)
    enemyReaction()

    let time = 100;
    document.getElementById("attack").disabled = true;

    let timer= setInterval(()=> {
        time-=10
        document.getElementById("attack").innerText = "Ожидание: " + time;
    },hero.speed/10)
    setTimeout(()=>{
        document.getElementById("attack").disabled = false;
        document.getElementById("attack").innerText = "Атаковать";
        clearInterval(timer)
    },hero.speed)

    document.getElementById("enemyHp").innerText = enemy.hp + " из " + enemy.hpMax;
}


//------------------------------------------Противники----------------------------------------------
function enemyConstructor(enemyName,enemyHp,enemyDmg,enemySpeed,enemyImg,enemyReward){
    this.name = enemyName;
    this.hpMax = enemyHp;
    this.hp = this.hpMax
    this.dmg = enemyDmg;
    this.speed = enemySpeed;
    this.img1 = enemyImg;
    this.reward = enemyReward;
    this.attack = function() {
        let timer = setInterval(() => {
            if (hero.hp>0 && this.hp>0){
                hero.hp-=this.dmg;
                document.getElementById("hp").style.color = "red";
                document.getElementById("hp").style.transform = "scale(1.3)";
                rewriteStats()
                setTimeout(()=>{
                    document.getElementById("hp").style.color = "black";
                    document.getElementById("hp").style.transform = "scale(1)";
                },this.speed/2)
            }else if(hero.hp<=0){
                clearInterval(timer)
                if (locationHero=="prison"){
                    prisonHealer()
                }else{
                    death()
                }
            }else if(this.hp<=0){
                clearInterval(timer)
                this.giveReward()
                this.hp = this.hpMax
                rewriteStats()
                outOfBattle()
                console.log("Локация: "+locationHero)
                document.getElementById("text").innerText = "Вы победили. Награда: "+this.reward + " монет";
                if ((enemy.hp<=0) || (locationHero=="forest")){
                    document.getElementById("forestNext").style.display = "block";
                }else if ((enemy.hp<=0) || (locationHero=="town")){
                    document.getElementById("walkTown").style.display = "block";
                }else if ((enemy.hp<=0) || (locationHero=="tavern")){
                    document.getElementById("tavernNext").style.display = "block";
                }else if (locationHero=="prison"){
                    document.getElementById("prisonNext").style.display = "block";
                }
            }
        }, this.speed);
    };
    this.giveReward = function() { hero.coins +=this.reward; };
}

let spider = new enemyConstructor("Паук",10,1,500,"images/enemy/spider.png",1)
let rat = new enemyConstructor("Крыса",15,2,1000,"images/enemy/rat.png",2)
let dog = new enemyConstructor("Одичавшая собака",20,3,1500,"images/enemy/dog.png",5)


let disertir = new enemyConstructor("Дезертир", 30,4,1000,"images/town/guard.png",7)
let robber = new enemyConstructor("Грабитель",25,5,1000,"images/town/thief.png",8)
let skeleton = new enemyConstructor("Скелет",30,6,1000,"images/enemy/skeleton.png",10)

let guard = new enemyConstructor("Стражник", 100,10,1000,"images/town/guard.png",7)

let ratKing = new enemyConstructor("Крысинный король",40,3,1500,"images/enemy/ratKing.png",30)

//------------------------------------------Служебные-------------------------------------------

//Расчет положительного или отрицательного события (добавить скрытые статы)
function looseOrWin(){
	let rndNum = Math.floor(Math.random()*2);
	return rndNum;
}

// Проверка платежеспособности для любого стата
function ggBeggar(stat, price){
	if (stat<price){
        stat=0
        return true
    }
    else if (stat>=price){
        stat-=price
        return false
    }
}

//Обновление статов на экране
function rewriteStats(){
	document.getElementById("hp").innerText = hero.hp;
	document.getElementById("rep").innerText = hero.rep;
    hero.coins = Math.floor(hero.coins*10)/10
	document.getElementById("coins").innerText = hero.coins;

    document.getElementById("heroHp").innerText = "Здоровье: "+ hero.hp;
    document.getElementById("heroCoins").innerText = "Монеты: "+ hero.coins;
    document.getElementById("heroRep").innerText = "Репутация: "+hero.rep;
    document.getElementById("heroWeapon").innerText = "Оружие: "+hero.weaponName;
    document.getElementById("heroDmg").innerText = "Урон: "+hero.dmg;
    document.getElementById("heroSpeed").innerText = "Скорость: "+hero.speed/1000 + " секунд";

}

// скрытие всех кнопок
function btnClose(){
    let identsTown = ["prisonNext","findGuardPrison","hub","walkTown","findTresure","findThief","findClickerWood","findBeggar","findGuard","findBasement","findCat","findKMB","findDude"]
    for (let i = 0; i < identsTown.length; i++){
        document.getElementById(identsTown[i]).style.display = "none";
    }

    let identsTavern = ["findCompany","tavernNext","backTavern","tavernHub","keeper","repPlus","business","backToKeeper","healer","sailor"]
    for (let i = 0; i < identsTavern.length; i++){
        document.getElementById(identsTavern[i]).style.display = "none";
    }

    let identsForest = ["forestNext","findAltar","findHunter","calmForest","findTresureForest","fightForest","battleScene"]
    for (let i = 0; i < identsForest.length; i++){
        document.getElementById(identsForest[i]).style.display = "none";
    }

    let identsPrison = ["neighborBandit", "prisonMine"]
    for (let i = 0; i < identsPrison.length; i++){
        document.getElementById(identsPrison[i]).style.display = "none";
    }
}

let profileOnOfF = 0;
function showProfile(){
    if (profileOnOfF == 1){
        document.getElementById("heroProfile").style.display = "none";
        profileOnOfF=0
    }else if(profileOnOfF == 0){
        document.getElementById("heroProfile").style.display = "block";
        profileOnOfF=1
    }
};

//----------------------------------------Создание типовых событий----------------------------

//Сооздание вводных типовых событий (1 порядок). Введение в курс дела
	// Параметры: id - идентификатор кнопки, img - изображение персонажа, evText - текст события
function startEvent(id1,backimg, img, evText, evHp, evCoins, evRep){
    btnClose()
    startElementAnimation(id1)   //анимация, плавно скрываем предыдущее событие
    setTimeout(() => {
        document.getElementById("text").innerText = evText;
        document.getElementById("mainScreen").style.background = 'url('+backimg+')';
        document.getElementById("mainScreen").style.backgroundSize = 'cover';
        document.getElementById("charImg").style.background = 'url('+img+')';
        document.getElementById("charImg").style.backgroundSize = "cover";
        document.getElementById(id1).style.display = "block";
        rewriteStats()
    }, animSpeed*1000);  //--timeout - длительность анимации, меняем объекты, пока они скрыты
    setTimeout(() => {
        endElementAnimation(id1)
    }, animSpeed*2000);    //timeout - длительность анимации x2, плавно появляется событие
    hero.hp+=evHp;
    if (hero.coins>=evCoins*-1){
        hero.coins+=evCoins;
    }else{
        hero.coins = 0
    }
    hero.rep+=evRep;
}

// Создание событий 2 порядка. Положительный и отрицательный исход
function secondEvent(id1, backimg, imgGood, imgBad, evTextGood, evTextBad, evHpGood, evCoinsGood, evRepGood, evHpBad, evCoinsBad, evRepBad){
    btnClose()
    startElementAnimation(id1)

    setTimeout(() => {
        document.getElementById(id1).style.display = "none";
        document.getElementById("mainScreen").style.background = 'url('+backimg+')';
        document.getElementById("mainScreen").style.backgroundSize = 'cover';
        let chance = looseOrWin()

	    if (chance==1){
            hero.hp+=evHpGood;
            hero.coins+=evCoinsGood;
            hero.rep+=evRepGood;
	    	document.getElementById("text").innerText = evTextGood;
	    	document.getElementById("charImg").style.background = 'url('+imgGood+')';
	    	document.getElementById("charImg").style.backgroundSize = "cover";
	    }else{
            hero.hp+=evHpBad;
            if (hero.coins>=evCoinsBad*-1){
                hero.coins+=evCoinsBad;
            }else{
                hero.coins = 0
            }
            hero.rep+=evRepBad;

	    	document.getElementById("text").innerText = evTextBad;
	    	document.getElementById("charImg").style.background = 'url('+imgBad+')';
	    	document.getElementById("charImg").style.backgroundSize = "cover";
	    }
    }, animSpeed*1000);
    rewriteStats()

    setTimeout(() => {
        endElementAnimation(id1)
    }, animSpeed*2000);
    if (locationHero=="town"){
        setTimeout(() => {
            document.getElementById("walkTown").style.display = "block";
        }, animSpeed*2000);
    }else if(locationHero=="tavern"){
        setTimeout(() => {
            document.getElementById("tavernNext").style.display = "block";
        }, animSpeed*2000);
    }

}

//---------------------------------------------Случайные события в городе-----------------------------------------
//                                 -----------------------------------------------------
//                                                   ---------------
  //=========Кошель=========
function findTresure(){
	startEvent("findTresure", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/coinsTree.png", 'Вы нашли кошель с золотом. Что будем делать?',0,0,0)
}

function tresureTake(){
    secondEvent("findTresure", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg', 'images/town/coinsTree.png', 'images/hunter.png', "Вы забрали деньги себе! +5 монет", 'К вам подходит сурового вида мужчина. "Решил прикарманить мое золото? Большая ошибка". Мужик навесил тебе тумаков. -20 здоровья -1 репутация', 0, 5, 0, -20, 0, -1)
}

function tresureLookAround(){
    secondEvent("findTresure",'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/hunter.png","images/hunter.png", 'В толпе вы видите мужчину, который растеряно хлопает по карманам. Вы возвращаете золото. "Спасибо тебе! Я всем расскажу о твоем благородном поступке!" +1 репутации', 'В толпе вы видите мужчину, который растеряно хлопает по карманам. Вы возвращаете золото. "Дай-ка я пересчитаю свое золотишко. 7-8-9... Да тут не хватает!" Вы нехотя отдаете монеты. Вас явно развели', 0,0,1,0,-2,0)
}

  //===============Воришка===================================
function thief(){
    if (hero.rep<0){
        startEvent("walkTown", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/thief.png", 'В толпе вы видите карманника. Он кивает вам и растворяется в толпе. Ага, молодец, своих не трогает',0,0,0)
    }else if (hero.coins>=5){
        startEvent("findThief", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/thief.png", 'В толпе с вами столкнулся человек. Да он вас обчистил!',0,-5,0)
    }else{
        startEvent("walkTown", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/thief.png", 'Проходя в толпе, вы задумались. "В кармане совсем пусто... Может стать карманником? Да ну, бред какой-то..."',0,0,0)
    }
}

thiefRun.onclick = function thiefRun(){
	secondEvent("findThief", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/thief2.png", "", "Вы знаете эти улицы как свои пять пальцев! Легко настигнув вора вы забираете свои деньги и забираете часть его монет, за моральный ущерб +7 монет +1 репутация","В глазах темнеет, голова кружится. Вы так и не смогли догнать проворного воришку. Ваши монеты утеряны навсегда -10 здоровья",0,7,1,-10, 0,0)
}

thiefCry.onclick = function thiefCry(){
    secondEvent("findThief", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg', "images/town/thief2.png", "", 'Вы громко кричите: "Держи вора!". Один человек из толпы подставил поднжку вору, и тот с криками улетел на землю. Вы выхватываете свой кошель','К сожалению, всем плевать на ваши крики. Воришка быстро растворился в толпе', 0,5,0,0,0,0)
}

//=====================Чувак===================================
function findDude(){
    startEvent("findDude", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/dude.png", '"Вы бы не могли подписать мою петицию?"',0,0,0)
}

function agreeDude() {
    secondEvent("findDude", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg', "images/town/dude.png","images/town/dude.png", '"Ехехе... Ты хоть видел что подписывал? А впрочем ладно, твой голос пошел во благо. +5 репутации"', 'Чувак молча бьет тебя лопатой по лицу и идет дальше... -20 здоровья -1 репутации', 0,0,5,-20, 0,-1)
}

  //==================Игра КМБ===============================
function findKMB(){
    startEvent("findKMB", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg', 'images/town/NoName.png', 'На улице сидит попрошайка. Он играет в камень/ножницы/бумага со всеми желающими. Размеется, не просто так. Ставка 1 монета',0,0,0)
	document.getElementById("paper").disabled = ggBeggar(hero.coins,1);;
	document.getElementById("scissors").disabled = ggBeggar(hero.coins,1);
	document.getElementById("rock").disabled = ggBeggar(hero.coins,1);
}

function KMB(gesture){
	document.getElementById("findKMB").style.display = "none";
	let listOfGesture = ["камень","ножницы","бумага"]
	let rand = Math.floor(Math.random()*3)//0камень 1ножницы 2бумага
	if (listOfGesture[rand]==gesture){
        hero.coins++
		document.getElementById("text").innerText = '"И правда..." - попрошайка явно удивлен. "Чтож, забирай свой выигрыш" +1 монета.';
	}else{
        hero.coins--
		document.getElementById("text").innerText = '"Повезет в другой раз!" - попрошайка подмигнул и забрал монету со стола. -1 монета'
	}
	rewriteStats()
}

	//==========Мини-кликер "Древесина"======================
function helpGranny(){
    if (hero.rep>=0){
        needWood = Math.floor(Math.random()*50)
        document.getElementById("helpGranny").style.display = "block";
        startEvent("findClickerWood", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/granny.png", 'Эй, мил человек! Помоги старушке, наколи дров. Плачу 3 монеты.',0,0,0)
    }else if(hero.rep<0){
        startEvent("findClickerWood", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/granny.png", '"Чего смотришь? Мимо проходи, не стой над душой. Ну и молодежь нынче...". До это бабули явно дошли слухи о ваших поступках...',0,0,0)
        document.getElementById("helpGranny").style.display = "none";
    }
}

function clickerWood(){
	document.getElementById("walkTown").style.display = "none";
	if (clickWood < needWood){
		clickWood++
		document.getElementById("text").innerText = "Дров "+clickWood+" из "+(needWood+1);
	}else{
        hero.coins+=3;
        hero.rep++;
		clickWood=0;
		document.getElementById("text").innerText = "Ну спасибо, помог бабушке. Это тебе, ни в чем себе не отказывай +3 монет +1 репутации";
		document.getElementById("walkTown").style.display = "block";
        document.getElementById("helpGranny").style.display = "none";
		rewriteStats()
	}
}

	// ===============Попрошайка=============================
function findBeggar(){
	startEvent("findBeggar", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/NoName.png", 'Вы встретили бродягу. Он явно нетрезв. "Я дича-а-а-а-айше извиняюсь...  Уважаемый... ух. Не найдется монеты, для страждущей души?"',0,0,0)
}

function giveCoinBeggar(){
    if (hero.coins>=3){
        secondEvent("findBeggar", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/NoName.png", "images/town/NoName.png", '"Ик! О-о-о, мое уважение, долгих лет жизни, счастья, здоровья..." Бродяга рассыпается в благодарнастях. -1 монета +1 репутация', '"Хе, да ты никак при деньгах... отдавай весь кошель, любезный". Бродяга вас ограбил, -3 монеты', 0, -1,1,0,-3,0 )
    }else{
        secondEvent("findBeggar", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/NoName.png", "images/town/NoName.png", 'Бродяга видит ваш пустой кошель. "Так, уважаемый... я смотрю ты сам не богат. Мне даже совестно у тебя что-то просить. На вот монету, вспоминай меня добрым словом". +1 монета', '"Аахахахах... Ой не могу, ик! Не позорься, убирай свои копейки...". Вас обсмеял нищий. -1 репутация', 0, 1,0,0,0,-1 )
    }
}

	// =======================Стражник=======================
function findGuard(){
    setTimeout(() => {
        document.getElementById("walkTown").style.display = "none";
    }, animSpeed*2010);
    if (hero.rep>=0){
        document.getElementById("coinGuard").disabled = ggBeggar(hero.coins,2)
        startEvent("findGuard", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/guard.png", 'Вас останавливает стражник. "Гражданин! Мы разыскиваем карманника и ты подходишь под описание. Карманы к досмотру!"',0,0,0)
    }else if(hero.rep<0){
        document.getElementById("walkTown").style.display = "none";
        fine = hero.rep*(-10);
        document.getElementById("fineGuard").disabled = ggBeggar(hero.coins,fine)
        document.getElementById("fineGuard").innerHTML = 'Штраф -' + fine + '<img src="images/coins.png">'
        startEvent("findGuardPrison", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/guard.png", '"Стоять, преступное отродье! Я не позволю нарушать закон в мою смену! Оплачивай штраф или сгниешь в тюрьме!"',0,0,0)
    }
}

function agreeGuard(){
	secondEvent("findGuard", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/guard.png","images/town/guard.png", '"Вроде все чисто... Спасибо за сотрудничество, гражданин!". Стражник уходит по своим делам. +1 репутация', 'Стражник роется в ваших вещах, выбрасывает вашу сумку на землю и уходит. Проверив свои пожитки вы поняли, что вас обокрали -2 монеты', 0, 0, 1,0,-2,0)
}

function coinGuard(){
    secondEvent("findGuard",'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg', "images/town/guard.png","images/town/guard.png", 'Стражник аккуратно берет взятку. Затем нарочно громко говорит: "Спасибо за сотрудничество, к вам нет претензий!" -2 монеты', '"Как ты смеешь подкупать начальника городской стражи!" Стражник бьет вас дубинкой -10 здоровья -2 репутации', 0, -2, 0,-10,0,-2)
}

function fightGuard(){
	secondEvent("findGuard", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/guard.png","images/town/guard.png", 'Вы ловко делаете подсечку. Стражник неуклюже падает в лужу, а вы успеваете убежать. Несколько зевак одобрительно засмеялись +4 репутации', 'Подготовленный стражник легко справляется с вашими атаками. Когда ему надоело с вами играться, он делоет один четкий и сильный удар вам в челюсть. -20 здоровья -2 репутации', 0, 0, 4,-20,0,-2)
}
	
	// =========================Подвал=======================
function findBasement(){
    if (hero.rep>=0){
        startEvent("findBasement", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/granny.png", 'О, авантюрист! Ты тот кто мне нужен. Из моего подвала доносятся какие-то странные звуки, всю ночь не могла уснуть. Не мог бы ты посмотреть, что там происходит?',0,0,0)
    }else if(hero.rep<0){
        startEvent("findBasement", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/granny.png", '"Опять ты, злодей? Проходи, не задерживайся! Хотя... В мой подвал кто-то забрался, сделай хоть раз доброе дело, проверь что там."',0,0,0)
    }
}

function fightBasement(){
    findFight(spider)
	}



// ==========================Странный кот (сфинкс)===========
function findCat(){
    startEvent("findCat", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/cat.png", 'Словно из ниоткуда перед вами появился странный кот. "Привет, человек" - прозвучал голос в вашей голове - "Мы встретимся трижды. Отгадаешь мои загадки - получишь приз"',0,0,0)
}

function riddlesCat(){
    document.getElementById("walkTown").style.display="none";
    let riddles = ["Перед ним волы вспахивали белое поле. Он держал белый плуг и сеял черные семена",
        "В мире есть дом: его голос звучит постоянно. Те же, кто в доме живут, всегда молчаливы. И дом и жители в вечном движении",
        "Нет у меня лица, но ничье лицо мне не чуждо. Дивный блеск изнутри ничего не покажет, пока перед собой свет не увидит",
        "У едока ни рта, ни брюха, он ест деревья и зверей. Наевшись досыта, растет. Плесни воды — и ты его убьешь.",
        "Это не увидеть глазами и не потрогать рукаи. Оно наполняет небо и всю землю, сотрясает все основания",
        "Я мягок, как шерсть и трясина, а когда надуваюсь, похож на лягушку. Я погружаюсь в воду и расту."
    ]
    let randRiddle = Math.floor(Math.random()*riddles.length)
    startElementAnimation("allQuestions")

    setTimeout(() => {
        document.getElementById("findCat").style.display = "none";
        document.getElementById("allQuestions").style.display = "block";

        for (let i = 0; i < riddles.length; i++){
            document.getElementById("question"+i).style.display = "none";
        }
        document.getElementById("text").innerText = riddles[randRiddle];
    }, animSpeed*1000);

    setTimeout(() => {
        endElementAnimation("allQuestions")
        document.getElementById("question"+randRiddle).style.display = "block";
    }, animSpeed*2000);

}

function wrongAnswer(){
    document.getElementById("allQuestions").style.display = "none";
    startEvent("walkTown", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/cat.png", '"Не верно. Не отчаивайся, думаю мы встретимся еще...". Кот растворился в воздухе',0,0,0)
    rewriteStats()
}

function correctAnswer(){
    document.getElementById("allQuestions").style.display = "none";
    correctAnswers++
    if (correctAnswers==3) {
        startEvent("walkTown", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/cat.png", '"Ты ответил верно на 3 вопроса. Как я и обещал, получай награду" +3 репутации +5 монет',0,5,3)
        rewriteStats()
        correctAnswers=0
    }else{
        startEvent("walkTown", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/town/cat.png", '"Верно" - промурчал кот. Верных ответов '+correctAnswers+ ' из 3. Еще увидимся"',0,0,0)
    }
}

//----------------------------------------События тюрьмы-----------------------------------------------
//--------------сокамерник
function neighbor(){
    let rndNum = Math.random()
    if (rndNum>=0 && rndNum<0.33){
        startEvent("prisonEv", "images/prison.jpg", "images/town/NoName.png", 'В камеру вводят еще одного заключенного. Это обычный бродяга с улиц. Вы перекидываетесь парой слов, ничего интересного не узнаете',0,0,0)
    }else if (rndNum>=0.33 && rndNum<0.66){
        setTimeout(() => {
            document.getElementById("prisonNext").style.display = "none";
        }, animSpeed*2100);
        startEvent("neighborBandit", "images/prison.jpg", "images/town/thief.png", 'В камеру вводят еще одного заключенного. Это опасный преступник. "Хочешь досидеть ло конца срока живым - плати"',0,0,0)
        document.getElementById("giveCoinsBandit").disabled = ggBeggar(hero.coins, 3)
    }else if (rndNum>=0.66 && rndNum<1){
        startEvent("prisonEv", "images/prison.jpg", "images/town/NoName.png", 'В камеру вводят еще одного заключенного. Это бывший рыцарь. "Могу показать тебе пару приемов, если хочешь". Ваш урон увеличен',0,0,0)
        hero.dmg = Math.floor(hero.dmg*1.1*10)/10
    }
}

function giveCoinsBandit(){
    startEvent("prisonEv", 'images/prison.jpg', 'images/town/thief.png', "Вот так бы сразу. А теперь свали и не отсвечивай", 0,-3,0)
    document.getElementById("prisonNext").style.display = "block";
}

function arena(){
    setTimeout(() => {
        document.getElementById("prisonNext").style.display = "none";
    }, animSpeed*2100);
    enemyList = [dog, rat, robber, spider]
    let rndNum = Math.floor(Math.random()*enemyList.length)
    enemy = enemyList[rndNum]
    findBoss("Начальник тюрьмы устраивает бои на потеху публике. Сегодня вы - гладиатор на его арене. Постарайтесь не умереть. В этот раз против вас "+enemy.name, enemy,"images/prison.jpg")
}

function prisonHealer(){
    outOfBattle()
    btnClose()
    startEvent("prisonEv", "images/prison.jpg", "images/healer.png", '"Ого, живой! В тюрьме из медикаментов только подорожник, так что будь аккуратнее. В следующий раз могу не вылечить"',0,0,0)
    hero.hp = 20
    document.getElementById("prisonNext").style.display = "block";
    rewriteStats()
}

function prisonMine(){
    setTimeout(() => {
        document.getElementById("prisonNext").style.display = "none";
    }, animSpeed*2100);
    needWood = Math.floor(Math.random()*50)
    startEvent("prisonMine", "images/prison.jpg", "",'Пришла пора отрабатывать тюремную еду. Вас отправляют в шахты', 0,0,0)
}

function prisonClicker(){
    if (clickWood < needWood){
        clickWood++
        document.getElementById("text").innerText = "Добыто руды "+clickWood+" из "+(needWood+1);
    }else{
        clickWood=0;
        document.getElementById("text").innerText = "Дело сделано";
        document.getElementById("prisonMine").style.display = "none";
        document.getElementById("prisonNext").style.display = "block";
        rewriteStats()
    }
}

function prisonFood(){
    let rndNum = Math.random()
    if (rndNum>=0 && rndNum<0.33){
        startEvent("prisonEv", "images/prison.jpg", "images/town/guard.png", 'Вот и пришло время обеда. Ого! В этот раз обычная каша. В чем подвох? +10 здоровья',10,0,0)
    }else if (rndNum>=0.33 && rndNum<0.66){
        setTimeout(() => {
            document.getElementById("prisonNext").style.display = "none";
        }, animSpeed*2100);
        startEvent("neighborBandit", "images/prison.jpg", "images/town/guard.png", 'Вот и пришло время обеда. Это что, жареная крыса? Феее...',0,0,0)
        document.getElementById("giveCoinsBandit").disabled = ggBeggar(hero.coins, 3)
    }else if (rndNum>=0.66 && rndNum<1){
        startEvent("prisonEv", "images/prison.jpg", "images/town/guard.png", 'Вот и пришло время обеда. Ого! В этот раз обычная каша? Съев пару ложек вы замечаете, что вам стало плохо... -20 здоровья',-20,0,0)
        hero.dmg = Math.floor(hero.dmg*1.1*10)/10
    }
}

// ----------------------------------------------События таверны------------------------------------------------------------------
//                      ------------------------------------------------------------------------
//                                              -----------------

function findReputation(){
    startEvent("repPlus", "https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/keeper.png", '"Репутация - это твое лицо в обществе. Хорошая репутация открывает нужные двери, плохая - ненужные. Могу поправить твою репутацию за умеренную плату"',0,0,0)
    setTimeout(() => {
        document.getElementById("backToKeeper").style.display = "block";
    }, animSpeed*2000);
}

function shopBuy(price,id1, hpGet,repGet, dmgGet, speedGet){
    hero.coins -= price;
    if (hero.hp+hpGet>100){
        hero.hp = 100;
    }else{
        hp+=hpGet
    }
    hero.rep += repGet;
    if (dmgGet>0){
        hero.dmg = dmgGet;
    }
    hero.speed = speedGet
    document.getElementById(id1).disabled = ggBeggar(hero.coins, price);
    if (locationHero=="shop"){
        document.getElementById("rustKnife").disabled = ggBeggar(hero.coins,30);
        document.getElementById("rustSword").disabled = ggBeggar(hero.coins,80);
        if (id1=="rustKnife"){hero.weaponName="Ржавый нож"}
        else if (id1=="rustSword"){hero.weaponName="Ржавый меч"}
    }
    rewriteStats()
}
// ===================Вклад=======================
function findBusiness(){
    document.getElementById("depositPlus").disabled = ggBeggar(hero.coins,20);
    if (deposit==0){ document.getElementById("depositMinus").disabled = true; }
    startEvent("business", "https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/keeper.png", '"Лучший спопсоб приумножить деньги - вложить их в дело. Можешь передать часть своих кровных мне - потом заберешь больше"',0,0,0)
    setTimeout(() => {
        document.getElementById("backToKeeper").style.display = "block";
    }, animSpeed*2000);
}

function depositPlus(){
    hero.coins -= 20
    deposit += 20;
    document.getElementById("depositSum").innerText = deposit;
    if (deposit>0){ document.getElementById("depositMinus").disabled = false; }
    rewriteStats()
    document.getElementById("depositPlus").disabled = ggBeggar(hero.coins,20);
}

function depositMinus() {
    if (deposit<20){
        hero.coins+=deposit;
        deposit=0;
        document.getElementById("depositMinus").disabled = true;
    }else{
        hero.coins += 20
        deposit -= 20;
    }
    document.getElementById("depositSum").innerText = deposit;
    rewriteStats();
    document.getElementById("depositPlus").disabled = ggBeggar(hero.coins,20);
    if (deposit==0){
        document.getElementById("depositMinus").disabled = true;
    }
}

// ===============Покупка репутации==================
function findKeeper(){
    document.getElementById("plusRep").disabled = ggBeggar(hero.coins,10);
    document.getElementById("plusRep10").disabled = ggBeggar(hero.coins,90);
    startEvent("keeper", "https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/keeper.png", '"Приветствую, тебе как обычно? В городе бывает неспокойно, советую оставить деньги у меня, на вкладе. Если возникнет проблема с местными - также обращайся."',0,0,0)
    setTimeout(() => {
        document.getElementById("backTavern").style.display = "block";
    }, animSpeed*2000);
}

function findGossip(){
    listOfGossip = [
        '"В лесу много добычи, это да. Но и много опасностей. Я бы не ходил туда с голыми кулаками."',
        '"Встречал в городе милую бабушку, которой постоянно нужно нарубить дров? Подозрительно, не находишь?"',
        '"Чем дальше в лес, тем скибиди доп доп доп ес ес"',
        '"А помнишь в лесу водились лабубу? Слава богу, их разработчик вырезал."',
        '"Говорят в городе появился какой-то Чув...чудак, просит всех подписать петицию. Слушай, а петиция это вообще что?"',
        '"Если возникнут проблемы с законом - приходи ко мне. Я все улажу, за небольшое вознаграждение."',
        '"В лесу начали находить странные записки. А еще ходят байки про длинного человека в черном. Говорят, у него нет лица..."',
        '"Если увидишь плачущую статую ангела - НЕ МОРГАЙ!"',
        "Однажды я украл сладкий рулет и мне даже ничего за это не было!",
        '"Слушай, а вот скелеты в лесу. Как они вообще двигаются? У них же нет мышц..."',
        '"Недавно приходил один тут... Говорит, что нашел волшебного кота! Совсем допился, бедолага."',
        '"Если сдать деньги на хранение, то их не отнимут в драке. Понял намек?"',
        '"Я раньше в ОПГ iKODe был, ты знал?"',
        '"Здесь могла быть ваша отсылка"',
        '"А вот Хиробрин существует или это выдумка, как думаешь?"',
        '"Сейчас бы вареной картошки с селедочкой, да с лучком, а?"',
        '"Inscryption - очень достойная игра, кстати."', '"..."',
        '"А ведь случайные события -довольно ленивый прием."',
        '🎵"О-йой... Задом к трону намертво прилип наш король..."🎵',
        '🎵"А дуб стоит и ныне там, и в снег, и в град, и в гром. Сто лет расти его ветвям... Так выпьем за него!"🎵',
        '🎵"Всего одна жизнь, всего одна смерть... и тысяча способов их прозевать"🎵',
        '"Охотника встречал? Каким-то образом он может появляться в нескольких местах одновременно! Жуткий тип..."',
        '"Думаю повесить на стену портрет Дмитрия Брикоткина"',
        '"Когда-то и меня вела дорога приключений… А потом мне прострелили колено"',
    ]
    let rndNum = Math.floor(Math.random()*listOfGossip.length);
    startEvent("findGossip", "https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/keeper.png", listOfGossip[rndNum], 0,0,0)
}

function findCompany(){
    startEvent("findCompany", "https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", '', "Вам стало скучно. В конце зала вы видите шумную компанию. Попробуете присоединиться к ним?",0,0,0)
}

function talkCompany(){
    if (hero.rep>0){
        secondEvent("findCompany", "https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", 'images/town/NoName.png',"images/town/thief.png", 'За столом сидят местные работяги. "А, авантюрист! Ну, хорошему человеку мы всегда рады, присоединяйся!" Вы весело проводите время +2 репутации', 'За столом сидят местные бандиты. "Шел бы ты отсюда, лопушок. Такому простачку как ты за нашим столом места нет. И монеты гони, а то не поздоровится" -5 монет', 0,0,2,0,-5,0)
    }else if (hero.rep<=0){
        secondEvent("findCompany", "https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", 'images/town/NoName.png',"images/town/thief.png", 'За столом сидят местные работяги. "Хм... Наслышаны о тебе... Шел бы ты отсюда, пока зубы целы" -2 репутации', 'За столом сидят местные бандиты. "Ахаха, присаживайся с нами! Мы сорвали большой куш, давай отметим!". Вы славно проводите время, и даже успеваете умыкнуть кошель одного из бандитов +5 монет', 0,0,-2, 0,5,0)
    }
}

//=====================Лекарь===============
function findHealer(){
    document.getElementById("plusHp").disabled = ggBeggar(hero.coins,7);
    startEvent("healer", "https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/healer.png", 'Лекарь отрывается от записей и поднимает взгляд на вас. "Что-то ты бледный... Рассказывай, что с тобой в этот раз"',0,0,0)
    setTimeout(() => {
        document.getElementById("backTavern").style.display = "block";
    }, animSpeed*2000);
}

function findSailor(){
    startEvent("sailor", "https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/sailor.png", 'За столом сидит скучающий старый моряк. "Эй ты! Как там тебя... сыграем в кости?"',0,0,0)
}



// -----------------------------------------------События леса------------------------------------------------------------------
//                      ------------------------------------------------------------------------
//                                              -----------------
function findHunter(){
    startEvent("findHunter","images/forest/forestBg.jpg","images/hunter.png",'Вы встречаете опытного охотника из города. "Ты как, не потерялся? За небольшую плату могу вывести в город. Всего за '+Math.floor(hero.coins*0.2*10)/10+' золотых"',0,0,0)
}

function backHubFromForest(){
    hero.coins-=Math.floor(hero.coins*0.2*10)/10
    rewriteStats()
    backToHub()
    loopCount=0;
    forestLoopCount=0;
}

function calmForest(){
    startEvent("calmForest","images/forest/forestBg.jpg","",'В лесу тихо и спокойно',0,0,0)
}

function findAltar() {
    if (hero.rep<priceUpgrade){
        document.getElementById("speedUp").disabled = true;
        document.getElementById("dmgUp").disabled = true;
    }
    startEvent("findAltar","images/forest/forestBg.jpg","images/forest/altar.png","Вы находите алтарь со светящимся знаком репутации. Пришло время усилиться. Ваш урон: "+hero.dmg+". Скорость атаки: раз в " + hero.speed/1000+"с", 0,0,0)
}

function fightStatUp(stat) {
    hero.rep -= priceUpgrade;
    if (stat == "speed"){
        hero.speed = Math.floor((hero.speed-=hero.speed*0.05) *10)/10
    }else if (stat == "damage"){
        hero.dmg = Math.floor(hero.dmg*1.1*10)/10
    }

    rewriteStats()
    document.getElementById("text").innerText = "Символ вспыхнул ярче. Теперь люди меньше вам доверяют, но вы стали сильнее. Ваш урон: "+hero.dmg+". Скорость атаки: раз в " + Math.floor(hero.speed/100)/10+"с"
    priceUpgrade = Math.floor(priceUpgrade *= 1.2)
    document.getElementById("speedUp").innerHTML = 'Скорость -' + priceUpgrade + '<img src="images/rep.png"/>';
    document.getElementById("dmgUp").innerHTML = 'Урон -' + priceUpgrade + '<img src="images/rep.png"/>';
    if (hero.rep<priceUpgrade){
        document.getElementById("speedUp").disabled = true;
        document.getElementById("dmgUp").disabled = true;
    }
}

function findBoss(text, boss, bgimg){
    btnClose()
    document.getElementById("fightForest").style.display = "block";
    document.getElementById("runFightDisabled").style.display = "none";
    //let enemyList = [guard, strider,spider]
    //let randNum = Math.floor(Math.random()*enemyList.length)
    enemy = boss
    document.getElementById("enemyHp").innerText = enemy.hp + " из " + enemy.hpMax;
    startEvent("fightForest",bgimg, enemy.img1, text,0,0,0)
}
//=======================================Главная петля. Выбор случайного события========================================
//                          ------------------------------------------------------------------
//                                          ---------------------------------
//Петля города
function rndEvent(){
    locationHero = "town"
    btnClose()
    if (hero.hp<=0){
        death()
        return
    }
	if (loopCount<=10){
		loopCount++;
		let events = [findTresure, thief, findKMB, helpGranny, findBeggar, findGuard, findBasement, findCat, findDude] //Массив с функциями
		let rndNum = Math.floor(Math.random()*events.length)
		events[rndNum]()//Скобочки после массива вызовут функцию
        setTimeout(() => {
            document.getElementById("walkTown").style.display = "block";
        }, animSpeed*2000);
	}else{
        day++;
        deposit += Math.floor(deposit * 2 /100*10)/10
        document.getElementById("depositSum").innerText = deposit;
        startEvent("hub", "https://i.pinimg.com/originals/5c/1f/1c/5c1f1c9238e3d395047269a781363b55.jpg", "","День:"+day+". Куда отправляемся?",0,0,0)
		loopCount=0
	}
}

//Петля таверны
function tavernEvent(){
    locationHero = "tavern"
    btnClose()
    if (hero.hp<=0){
        death()
        return
    }
    if (loopCount<=10){
        loopCount++;
        let events = [findSailor, findGossip, findCompany] //Массив с функциями
        let rndNum = Math.floor(Math.random()*events.length)
        events[rndNum]()//Скобочки после массива вызовут функцию
        setTimeout(() => {
            document.getElementById("tavernNext").style.display = "block";
        }, animSpeed*2000);
    }else{
        day++;
        deposit += Math.floor(deposit * 2 /100*10)/10
        document.getElementById("depositSum").innerText = deposit;
        startEvent("hub", "https://i.pinimg.com/originals/5c/1f/1c/5c1f1c9238e3d395047269a781363b55.jpg", "","День:"+day+". Куда отправляемся?",0,0,0)
        loopCount=0
    }
}

//Петля леса
function forestEvent(){
    locationHero = "forest"
    btnClose()
    forestLoopCount++
    console.log("Игровой круг: "+forestLoopCount)

    if (forestLoopCount%9 == 0){
        findAltar()
        setTimeout(() => {
            document.getElementById("forestNext").style.display = "block";
        }, animSpeed*2000);
    }else if (forestLoopCount%10 ==0){
        day++;
        deposit += Math.floor(deposit * 2 /100*10)/10
        document.getElementById("depositSum").innerText = deposit;
        findBoss("Лес - опасное, мистическое место. Помимо обычных обитателей здесь можно встретить жутких существ из страшных рассказов, которыми пугают детей в городе... Перед вами Крысиный Король", ratKing, 'images/forest/forestBg.jpg')
    }else if (forestLoopCount%10 == 1 && forestLoopCount!=1){
        findHunter()
        setTimeout(() => {
            document.getElementById("forestNext").style.display = "block";
        }, animSpeed*2000);
    }else {
        let rndNum = Math.random()

        if (hero.hp<=0){
            death()
            return;
            //---Спокойный лес-----------------------------------
        }else if (rndNum>=0 && rndNum<0.2){
            calmForest()
            setTimeout(() => {
                document.getElementById("forestNext").style.display = "block";
            }, animSpeed*2000);
            //---Сражение----------------------------------------
        }else if (rndNum>=0.3 && rndNum<1){
            findFight("")
            //---Охотник-----------------------------------------
        }else if (rndNum>=0.2 && rndNum<3){
            findHunter()
            setTimeout(() => {
                document.getElementById("forestNext").style.display = "block";
            }, animSpeed*2000);
        }
    }
}


function prisonEvent(){
    locationHero = "prison"
    btnClose()
    if (loopCount<=10){
        loopCount++;
        let events = [neighbor, arena, prisonMine, prisonFood] //Массив с функциями
        let rndNum = Math.floor(Math.random()*events.length)
        events[rndNum]()
        setTimeout(() => {
            document.getElementById("prisonNext").style.display = "block";
        }, animSpeed*2000);
    }else{
        day++;
        if (hero.rep<0){
            hero.rep = 0;
        }
        deposit += Math.floor(deposit * 2 /100*10)/10
        document.getElementById("depositSum").innerText = deposit;
        startEvent("hub", "https://i.pinimg.com/originals/5c/1f/1c/5c1f1c9238e3d395047269a781363b55.jpg", "","День:"+day+". Куда отправляемся?",0,0,0)
        loopCount=0
        rewriteStats()
    }
}


// Стартовые функции
btnTown.onclick = function goTown(){
    startEvent("walkTown",'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg','',"Вы решили прогуляться по городу",0,0,0)
}

btnForest.onclick = function goForest(){
    document.getElementById("hub").style.display = "none";
    btnClose()
    startEvent("forestNext","images/forest/forestBg.jpg", '',"Вы заходите в старый лес. Впереди опасности и приключения!",0,0,0)}

function goTavern(){
    document.getElementById("hub").style.display = "none";
    btnClose()
    startEvent("tavernHub","https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", '',"Вы заходите в таверну. Лука - хозяин таверны, любезно позволяет вам ночевать здесь",0,0,0)
}

function goPrison(){
    startEvent("prisonNext","images/prison.jpg", '',"Чтож, за свои поступки нужно отвечать. Теперь вы в тюрьме",0,0,0)
}

function backToHub(){
    startEvent("hub", "https://i.pinimg.com/originals/5c/1f/1c/5c1f1c9238e3d395047269a781363b55.jpg", "","День:"+day+". Куда отправляемся?",0,0,0)
}

//-----------------------------------Читы-------------------------------------
function cheatDMG(){
    hero.dmg += 100
    rewriteStats()
}
function cheatREPplus(){
    hero.rep += 100
    rewriteStats()
}

function cheatREPminus(){
    hero.rep -= 100
    rewriteStats()
}
function cheatRESTART(){
    hero.hp = 100
    hero.dmg = 5
    hero.rep = 3
    rewriteStats()
}


