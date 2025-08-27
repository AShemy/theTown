let hero = {
    hp:100,
    rep:0,
    coins:100,
    weaponName:"Кулаки",
    dmg:3,
    speed:500,
}

let locationHero;

let day = 1;
let deposit = 0;
let needWood;
let clickWood = 0;
let correctAnswers = 0;

let enemy;

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

function firstAttack(){
    document.getElementById("fist").classList.remove("startFirstAnimation");
    requestAnimationFrame(() => {
        document.getElementById("fist").classList.add("startFirstAnimation");
    });
}

function knifeAttack(){
    document.getElementById("fist").classList.remove("startKnifeAnimation");
    requestAnimationFrame(() => {
        document.getElementById("fist").classList.add("startKnifeAnimation");
    });
}

function swordAttack(){
    document.getElementById("fist").classList.remove("startSwordAnimation");
    requestAnimationFrame(() => {
        document.getElementById("fist").classList.add("startSwordAnimation");
    });
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
    document.getElementById("charImg").style.width = "20vw";
    document.getElementById("charImg").style.height = "20vw";
}

// если параметр enemy пустая строка "", появляется случайный враг из списка
function findFight(enemyPar){
    btnClose()
    document.getElementById("fightForest").style.display = "block";
    document.getElementById("runFightDisabled").disabled = false;

    if (enemyPar==""){
        let enemyList = [guard, strider,spider]
        let randNum = Math.floor(Math.random()*enemyList.length)
        enemy = enemyList[randNum]
    }else{
        enemy = enemyPar
    }
    console.log("Враг хп"+enemy.hp)
    document.getElementById("enemyHp").innerText = enemy.hp + " из " + enemy.hpMax;
    startEvent("fightForest","images/forestBg.jpg", enemy.img1, "На вас набрасывается "+enemy.name,0,0,0)
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
    document.getElementById("fist").style.display = "block";
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
    if (hero.weaponName == "Кулаки"){
        firstAttack()
    }else if (hero.weaponName=="Ржавый нож"){
        knifeAttack()
    }else if (hero.weaponName == "Ржавый меч"){
        swordAttack()
    }
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
                rewriteStats()
            }else if(hero.hp<=0){
                clearInterval(timer)
                death()
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
                }
            }
        }, this.speed);
    };
    this.giveReward = function() { hero.coins +=this.reward; };
}

let guard = new enemyConstructor("Дезертир", 50,6,2000,"images/guard.png",30)
let strider = new enemyConstructor("Грабитель",30,3,1000,"images/NoName.png",5)
let spider = new enemyConstructor("Паук",20,1,800,"images/spider.png",1)

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
    let identsTown = ["hub","walkTown","findTresure","findThief","findClickerWood","findBeggar","findGuard","findBasement","findCat","findKMB"]
    for (let i = 0; i < identsTown.length; i++){
        document.getElementById(identsTown[i]).style.display = "none";
    }

    let identsTavern = ["backTavern","tavernHub","keeper","repPlus","business","backToKeeper","healer","merchant","sailor","shop"]
    for (let i = 0; i < identsTavern.length; i++){
        document.getElementById(identsTavern[i]).style.display = "none";
    }

    let identsForest = ["fist","forestNext","findHunter","calmForest","findTresureForest","fightForest","battleScene"]
    for (let i = 0; i < identsForest.length; i++){
        document.getElementById(identsForest[i]).style.display = "none";
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

    setTimeout(() => {
        document.getElementById("walkTown").style.display = "block";
        }, animSpeed*2000);
}

//---------------------------------------------Случайные события в городе-----------------------------------------
//                                 -----------------------------------------------------
//                                                   ---------------
  //=========Кошель=========
function findTresure(){
	startEvent("findTresure", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/coinsTree.png", 'Вы нашли кошель с золотом. Что будем делать?',0,0,0)
}

function tresureTake(){
    secondEvent("findTresure", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg', 'images/coinsTree.png', 'images/hunter.png', "Вы забрали деньги себе! +5 монет", 'К вам подходит сурового вида мужчина. "Решил прикарманить мое золото? Большая ошибка". Мужик навесил тебе тумаков. -20 здоровья -1 репутация', 0, 5, 0, -20, 0, -1)
}

function tresureLookAround(){
    secondEvent("findTresure",'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/hunter.png","images/hunter.png", 'В толпе вы видите мужчину, который растеряно хлопает по карманам. Вы возвращаете золото. "Спасибо тебе! Я всем расскажу о твоем благородном поступке!" +1 репутации', 'В толпе вы видите мужчину, который растеряно хлопает по карманам. Вы возвращаете золото. "Дай-ка я пересчитаю свое золотишко. 7-8-9... Да тут не хватает!" Вы нехотя отдаете монеты. Вас явно развели', 0,0,1,0,-2,0)
}

  //===============Воришка===================================
function thief(){
    if (hero.coins>=5){
        startEvent("findThief", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/thief.png", 'В толпе с вами столкнулся человек. Да он вас обчистил!',0,-5,0)
    }else{
        startEvent("walkTown", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/thief.png", 'Проходя в толпе, вы задумались. "В кармане совсем пусто... Может стать карманником? Да ну, бред какой-то..."',0,0,0)
    }
}

thiefRun.onclick = function thiefRun(){
	secondEvent("findThief", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/thief2.png", "", "Вы знаете эти улицы как свои пять пальцев! Легко настигнув вора вы забираете свои деньги и забираете часть его монет, за моральный ущерб +7 монет +1 репутация","В глазах темнеет, голова кружится. Вы так и не смогли догнать проворного воришку. Ваши монеты утеряны навсегда -10 здоровья",0,7,1,-10, 0,0)
}

thiefCry.onclick = function thiefCry(){
    secondEvent("findThief", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg', "images/thief2.png", "", 'Вы громко кричите: "Держи вора!". Один человек из толпы подставил поднжку вору, и тот с криками улетел на землю. Вы выхватываете свой кошель','К сожалению, всем плевать на ваши крики. Воришка быстро растворился в толпе', 0,5,0,0,0,0)
}

  //==================Игра КМБ===============================
function findKMB(){
    startEvent("findKMB", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg', 'images/NoName.png', 'На улице сидит попрошайка. Он играет в камень/ножницы/бумага со всеми желающими. Размеется, не просто так. Ставка 1 монета',0,0,0)
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
	needWood = Math.floor(Math.random()*50)
    document.getElementById("helpGranny").style.display = "block";
	startEvent("findClickerWood", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/granny.png", 'Эй, мил человек! Помоги старушке, наколи дров. Плачу 3 монеты.',0,0,0)
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
	startEvent("findBeggar", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/NoName.png", 'Вы встретили бродягу. Он явно нетрезв. "Я дича-а-а-а-айше извиняюсь...  Уважаемый... ух. Не найдется монеты, для страждущей души?"',0,0,0)
}

function giveCoinBeggar(){
    if (hero.coins>=3){
        secondEvent("findBeggar", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/NoName.png", "images/NoName.png", '"Ик! О-о-о, мое уважение, долгих лет жизни, счастья, здоровья..." Бродяга рассыпается в благодарнастях. -1 монета +1 репутация', '"Хе, да ты никак при деньгах... отдавай весь кошель, любезный". Бродяга вас ограбил, -3 монеты', 0, -1,1,0,-3,0 )
    }else{
        secondEvent("findBeggar", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/NoName.png", "images/NoName.png", 'Бродяга видит ваш пустой кошель. "Так, уважаемый... я смотрю ты сам не богат. Мне даже совестно у тебя что-то просить. На вот монету, вспоминай меня добрым словом". +1 монета', '"Аахахахах... Ой не могу, ик! Не позорься, убирай свои копейки...". Вас обсмеял нищий. -1 репутация', 0, 1,0,0,0,-1 )
    }
}

	// =======================Стражник=======================
function findGuard(){
    setTimeout(() => {
        document.getElementById("walkTown").style.display = "none";
    }, animSpeed*2010);
    document.getElementById("coinGuard").disabled = ggBeggar(hero.coins,2)
	startEvent("findGuard", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/guard.png", 'Вас останавливает стражник. "Гражданин! Мы разыскиваем карманника и ты подходишь под описание. Карманы к досмотру!"',0,0,0)
}

function agreeGuard(){
	secondEvent("findGuard", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/guard.png","images/guard.png", '"Вроде все чисто... Спасибо за сотрудничество, гражданин!". Стражник уходит по своим делам. +1 репутация', 'Стражник роется в ваших вещах, выбрасывает вашу сумку на землю и уходит. Проверив свои пожитки вы поняли, что вас обокрали -2 монеты', 0, 0, 1,0,-2,0)
}

function coinGuard(){
    secondEvent("findGuard",'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg', "images/guard.png","images/guard.png", 'Стражник аккуратно берет взятку. Затем нарочно громко говорит: "Спасибо за сотрудничество, к вам нет претензий!" -2 монеты', '"Как ты смеешь подкупать начальника городской стражи!" Стражник бьет вас дубинкой -10 здоровья -2 репутации', 0, -2, 0,-10,0,-2)
}

function fightGuard(){
	secondEvent("findGuard", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/guard.png","images/guard.png", 'Вы ловко делаете подсечку. Стражник неуклюже падает в лужу, а вы успеваете убежать. Несколько зевак одобрительно засмеялись +4 репутации', 'Подготовленный стражник легко справляется с вашими атаками. Когда ему надоело с вами играться, он делоет один четкий и сильный удар вам в челюсть. -20 здоровья -2 репутации', 0, 0, 4,-20,0,-2)
}
	
	// =========================Подвал=======================
function findBasement(){
	startEvent("findBasement", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/granny.png", 'О, авантюрист! Ты тот кто мне нужен. Из моего подвала доносятся какие-то странные звуки, всю ночь не могла уснуть. Не мог бы ты посмотреть, что там происходит?',0,0,0)
}

function fightBasement(){
    findFight(spider)
	}



// ==========================Странный кот (сфинкс)===========
function findCat(){
    startEvent("findCat", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/cat.png", 'Словно из ниоткуда перед вами появился странный кот. "Привет, человек" - прозвучал голос в вашей голове - "Мы встретимся трижды. Отгадаешь мои загадки - получишь приз"',0,0,0)
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
    startEvent("walkTown", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/cat.png", '"Не верно. Не отчаивайся, думаю мы встретимся еще...". Кот растворился в воздухе',0,0,0)
    rewriteStats()
}

function correctAnswer(){
    document.getElementById("allQuestions").style.display = "none";
    correctAnswers++
    if (correctAnswers==3) {
        startEvent("walkTown", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/cat.png", '"Ты ответил верно на 3 вопроса. Как я и обещал, получай награду" +3 репутации +5 монет',0,5,3)
        rewriteStats()
        correctAnswers=0
    }else{
        startEvent("walkTown", 'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg',"images/cat.png", '"Верно" - промурчал кот. Верных ответов '+correctAnswers+ ' из 3. Еще увидимся"',0,0,0)
    }
}

// =================================Арена====================
// ==================================Козел===================
// ==================================Архангел================

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

function gossip(){
    listOfGossip = [
        '"В лесу много добычи, это да. Но и много опасностей. Я бы не ходил туда с голыми кулаками."',
        '"Встречал в городе милую бабушку, которой постоянно нужно нарубить дров? Подозрительно, не находишь?"',
        '"Чем дальше в лес, тем скибиди доп доп доп ес ес"',    '"А помнишь в лесу водились лабубу? Слава богу, их разработчик вырезал."',
        '"Говорят в городе появился какой-то Чув...чудак, просит всех подписать петицию. Слушай, а петиция это вообще что?"',
        '"Если возникнут проблемы с законом - приходи ко мне. Я все улажу, за небольшое вознаграждение."',
        '"В лесу начали находить странные записки. А еще ходят байки про длинного человека в черном. Говорят, у него нет лица..."',
        '"Если увидишь плачущую статую ангела - НЕ МОРГАЙ!"',   "Однажды я украл сладкий рулет и мне даже ничего за это не было!",
        '"Слушай, а вот скелеты в лесу. Как они вообще двигаются? У них же нет мышц..."',
        '"Недавно приходил один тут... Говорит, что нашел волшебного кота! Совсем допился, бедолага."',
        '"Если сдать деньги на хранение, то их не отнимут в драке. Понял намек?"',
        '"Я раньше в ОПГ iKODe был, ты знал?"', '"Здесь могла быть ваша отсылка"',
        '"А вот Хиробрин существует или это выдумка, как думаешь?"', '"Сейчас бы вареной картошки с селедочкой, да с лучком, а?"',
        '"Inscryption - очень достойная игра, кстати."', '"..."', '"А ведь случайные события -довольно ленивый прием."'
    ]
    let rndNum = Math.floor(Math.random()*listOfGossip.length);
    document.getElementById("text").innerText = listOfGossip[rndNum];
}

//=====================Лекарь===============
function findHealer(){
    document.getElementById("plusHp").disabled = ggBeggar(hero.coins,7);
    startEvent("healer", "https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/healer.png", 'Лекарь отрывается от записей и поднимает взгляд на вас. "Что-то ты бледный... Рассказывай, что с тобой в этот раз"',0,0,0)
    setTimeout(() => {
        document.getElementById("backTavern").style.display = "block";
    }, animSpeed*2000);
}

//====================Продавец=================
function findMerchant(){
    startEvent("merchant", "https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/merchant.png", '"Приветствую, авантюрист. Чего желаешь?"',0,0,0)
    setTimeout(() => {
        document.getElementById("backTavern").style.display = "block";
    }, animSpeed*2000);
}

function openShop(){
    locationHero = "shop"
    document.getElementById("rustKnife").disabled = ggBeggar(hero.coins,30);
    document.getElementById("rustSword").disabled = ggBeggar(hero.coins,80);
    startEvent("shop", "https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/merchant.png", '"Лучшее оружее во всем... эм... ну, в этой таверне точно лучшее!"',0,0,0)
    setTimeout(() => {
        document.getElementById("backTavern").style.display = "block";
    }, animSpeed*2000);
}

function buyWeapon(weapon){
    if (weapon == "rustKnife"){
        shopBuy(30,"rustKnife",0,0,6,800)
        document.getElementById("fist").style.background= 'url("images/knife1.png")'
        document.getElementById("fist").style.backgroundSize = '100% 100%';
    }else if (weapon == "rustSword"){
        shopBuy(80,"rustSword",0,0,10,1000)
        document.getElementById("fist").style.background= 'url("images/sword1.png")'
        document.getElementById("fist").style.backgroundSize = '100% 100%';
    }
}

function findSailor(){
    startEvent("sailor", "https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/sailor.png", 'За столом сидит скучающий старый моряк. "Эй ты! Как там тебя... сыграем в кости?"',0,0,0)
    setTimeout(() => {
        document.getElementById("backTavern").style.display = "block";
    }, animSpeed*2000);
}

// -----------------------------------------------События леса------------------------------------------------------------------
//                      ------------------------------------------------------------------------
//                                              -----------------
function findHunter(){
    startEvent("findHunter","images/forestBg.jpg","images/hunter.png",'Вы встречаете опытного охотника из города. "Ты как, не потерялся? За небольшую плату могу вывести в город. Всего за '+Math.floor(hero.coins*0.2*10)/10+' золотых"',0,0,0)
}

function backHubFromForest(){
    hero.coins-=Math.floor(hero.coins*0.2*10)/10
    rewriteStats()
    backToHub()
    loopCount=0;
    forestLoopCount=0;
}

function calmForest(){
    startEvent("calmForest","images/forestBg.jpg","",'В лесу тихо и спокойно',0,0,0)
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
		let events = [findTresure, thief, findKMB, helpGranny, findBeggar, findGuard, findBasement, findCat] //Массив с функциями
		let rndNum = Math.floor(Math.random()*events.length)
		events[rndNum]()//Скобочки после массива вызовут фунцию
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

//Петля леса
function forestEvent(){
    locationHero = "forest"
    btnClose()
    forestLoopCount++
    console.log("Игровой круг: "+forestLoopCount)

    if (forestLoopCount%10 ==0){
        day++;
        deposit += Math.floor(deposit * 2 /100*10)/10
        document.getElementById("depositSum").innerText = deposit;
    }
    //let events = [findHunter, calmForest,findFight] //Массив с функциями

    let rndNum = Math.random()

    if (hero.hp<=0){
        death()
        return
    }else if (forestLoopCount%5==0 && forestLoopCount!=0){
        findHunter()
        setTimeout(() => {
            document.getElementById("forestNext").style.display = "block";
        }, animSpeed*2000);
    } else if (rndNum>=0 && rndNum<0.3){
        calmForest()
        setTimeout(() => {
            document.getElementById("forestNext").style.display = "block";
        }, animSpeed*2000);
    }else if (rndNum>=0.3 && rndNum<1){
        findFight("")
    }
}


// Стартовые функции
btnTown.onclick = function goTown(){
    startEvent("walkTown",'https://i.pinimg.com/736x/98/24/0a/98240a35aa4a357b980788b278b455ed.jpg','',"Вы решили прогуляться по городу",0,0,0)
}

btnForest.onclick = function goForest(){
    document.getElementById("hub").style.display = "none";
    btnClose()
    startEvent("forestNext","images/forestBg.jpg", '',"Вы заходите в старый лес. Впереди опасности и приключения!",0,0,0)}

function goTavern(){
    document.getElementById("hub").style.display = "none";
    btnClose()
    startEvent("tavernHub","https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", '',"Вы заходите в таверну. Лука - хозяин таверны, любезно позволяет вам ночевать здесь",0,0,0)
}

function backToHub(){
    startEvent("hub", "https://i.pinimg.com/originals/5c/1f/1c/5c1f1c9238e3d395047269a781363b55.jpg", "","День:"+day+". Куда отправляемся?",0,0,0)
}

