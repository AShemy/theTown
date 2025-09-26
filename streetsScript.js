let hero = {
    hp:100,
    rep:0,
    coins:3,
    dmg:5,
    attention: 1,
    agility: 1,
    speech: 1,
    speed: 1000,
}

let locationHero;

let day = 1;
let deposit = 0;
let depositArena = 0;
let needWood;
let clickWood = 0;
let correctAnswers = 0;

let enemy;

let priceUpgrade = 5;

let loopCount = 0;
let forestLoopCount = 0;
let animSpeed = 0.3;

let btn1;
let btn2;
let btn3;
let btn4;

btnClose()
document.getElementById("battleScene").style.display = "none";
goHub()

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
                btnCreate("Далее","","","")
                btnShow();
                if (locationHero=="forest"){
                    btn1.addEventListener("click", forestEvent)
                }else if (locationHero=="town"){
                    btn1.addEventListener("click", townEvent)
                }else if (locationHero=="tavern"){
                    btn1.addEventListener("click", tavernEvent)
                }else if (locationHero=="prison"){
                    btn1.addEventListener("click", prisonEvent)
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
let strider = new enemyConstructor("Бродяга", 30,3,1200,"images/town/NoName.png",5)



let ratKing = new enemyConstructor("Крысинный король",40,3,1500,"images/enemy/ratKing.png",30)


// ----------------------------------------- Боевка---------------------------------------------
//Смерть персонажа
function findFight(){
    btnClose()
    btnCreate("Сражаться","Бежать","","")
    btnShow()

    btn1.addEventListener('click', fightScene)
    btn2.disabled = false;
    btn2.addEventListener("click", runFight(btn2));

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
    document.getElementById("enemyHp").innerText = enemy.hp + " из " + enemy.hpMax;
    startEvent("images/forest/forestBg.jpg", enemy.img1, "На вас набрасывается "+enemy.name,0,0,0)
}

//появление сцены с битвой + атака врага
function fightScene(){
    btnClose()
    setTimeout(() => {
        endElementAnimation()
        document.getElementById("textBox").style.display = "none";
        document.getElementById("battleScene").style.display = "block";
        document.getElementById("charImg").style.width = "60%";
        document.getElementById("charImg").style.height = "62%";
        document.getElementById("charImg").style.backgroundRepeat = "no-repeat";
        document.getElementById("charImg").style.backgroundPosition = "center";
        document.getElementById("charImg").style.backgroundSize = "contain";
    }, animSpeed*2000);

    enemy.attack()
}
//побег
function runFight(btn){
    let chance = Math.floor(Math.random()*2)
    if (chance==0){
        btn.disabled = true;
        btn.innerHTML = "Вам не сбежать";
    }else{
        btn.addEventListener("click", forestEvent)
    }
}

//Выход из сражения, визуальное возвращение сцены в исходное состояние
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

function death(){
    locationHero = "tavern"
    outOfBattle()
    btnClose()
    loopCount = 0
    hero.coins*=0.5;
    hero.hp = 70;
    findHealer()
    startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/healer.png", '"О, очнулся! Еле выходил. В следующий раз будь осторожнее." Вы потеряли половину денег.',0,0,0)

}

function findBoss(text, boss, bgimg){
    btnClose()

    enemy = boss
    document.getElementById("enemyHp").innerText = enemy.hp + " из " + enemy.hpMax;
    startEvent(bgimg, enemy.img1, text,0,0,0)

    btnCreate("Сражаться","","","")
    btn1.addEventListener('click', fightScene)
    btnShow()
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




//----------------------------------------События тюрьмы-----------------------------------------------
//--------------сокамерник
function neighbor(){
    btnClose()
    let rndNum = Math.random()
    if (rndNum>=0 && rndNum<0.33){
        btnCreate("Далее","","","")
        startEvent("images/prison.jpg", "images/town/NoName.png", 'В камеру вводят еще одного заключенного. Это обычный бродяга с улиц. Вы перекидываетесь парой слов, ничего интересного не узнаете',0,0,0)
        btnShow()
        btn1.addEventListener('click', prisonEvent)
    }else if (rndNum>=0.33 && rndNum<0.66){
        btnCreate("Заплатить","Отказаться","","")
        startEvent("images/prison.jpg", "images/town/thief.png", 'В камеру вводят еще одного заключенного. Это опасный преступник. "Хочешь досидеть до конца срока живым - плати"',0,0,0)
        btn1.disabled = ggBeggar(hero.coins, 3)
        btnShow()
        btn1.addEventListener('click', function(){
            btnClose()
            startEvent('images/prison.jpg', 'images/town/thief.png', "Вот так бы сразу. А теперь свали и не отсвечивай", 0,-3,0)
            btnCreate("Далее","","","")
            btnShow()
            btn1.addEventListener('click', prisonEvent)
        })
        btn2.addEventListener('click', function(){
            findBoss("Ехехе... Тогда пощайся с жизнью!", robber, "images/prison.jpg")
        })
    }else if (rndNum>=0.66 && rndNum<1){
        startEvent("images/prison.jpg", "images/town/NoName.png", 'В камеру вводят еще одного заключенного. Это бывший рыцарь. "Могу показать тебе пару приемов, если хочешь". Ваш урон увеличен',0,0,0)
        btnCreate("Далее","","","")
        btnShow()
        hero.dmg = Math.floor(hero.dmg*1.1*10)/10
        btn1.addEventListener('click', prisonEvent)
    }
}

function arena(){
    enemyList = [dog, rat, robber, spider]
    let rndNum = Math.floor(Math.random()*enemyList.length)
    enemy = enemyList[rndNum]
    findBoss("Начальник тюрьмы устраивает бои на потеху публике. Сегодня вы - гладиатор на его арене. Постарайтесь не умереть. В этот раз против вас "+enemy.name, enemy,"images/prison.jpg")
}

function prisonHealer(){
    outOfBattle()
    btnClose()
    btnCreate("Далее","","","")
    btnShow()
    btn1.addEventListener('click', prisonEvent)
    startEvent("images/prison.jpg", "images/healer.png", '"Ого, живой! В тюрьме из медикаментов даже подорожника нет, так что будь аккуратнее. В следующий раз могу не вылечить" Вы ослаблены, урон уменьшен',0,0,0)
    hero.hp = 20;
    hero.dmg -= hero.dmg*0.1;
    rewriteStats();
}

function prisonMine(){
    needWood = Math.floor(Math.random()*70);
    btnClose()
    startEvent("images/prison.jpg", "",'Пришла пора отрабатывать тюремную еду. Вас отправляют в шахты', 0,0,0)
    btnCreate("Добывать", "", "","");
    btnShow()
    btn1.addEventListener("click", function() {
        if (clickWood < needWood){
            clickWood++
            document.getElementById("text").innerText = "Добыто руды "+clickWood+" из "+(needWood+1);
        }else{
            btnClose()
            rewriteStats()
            btnCreate("Далее","","","")
            btnShow()
            document.getElementById("text").innerText = "Дело сделано";
            clickWood=0
            btn1.addEventListener('click', prisonEvent)
        }
    })
}

function prisonFood(){
    btnCreate("Далее","","","")
    btnShow()
    btn1.addEventListener('click', prisonEvent)
    let rndNum = Math.random()
    if (rndNum>=0 && rndNum<0.33){
        startEvent("images/prison.jpg", "images/town/guard.png", 'Вот и пришло время обеда. Ого! В этот раз обычная каша. В чем подвох? +10 здоровья',10,0,0)
    }else if (rndNum>=0.33 && rndNum<0.66){
        startEvent("images/prison.jpg", "images/town/guard.png", 'Вот и пришло время обеда. Это что, жареная крыса? Феее...',0,0,0)
    }else if (rndNum>=0.66 && rndNum<1){
        startEvent("images/prison.jpg", "images/town/guard.png", 'Вот и пришло время обеда. Ого! В этот раз обычная каша? Съев пару ложек вы замечаете, что вам стало плохо... -20 здоровья',-20,0,0)
    }
}

function neighborFood(){
    startEvent("images/prison.jpg", "images/town/NoName.png", '"Эй, другалечек! Еда здесь поганая, да? Могу продать тебе этот изысканный сладкий рулет!"',0,0,0)
    btnClose()
    btnCreate("<img src='images/hp.png'/>+40 <img src='images/coins.png'/>-10","Жалобно выпросить","Дальше","")
    btnShow()

    btn1.addEventListener('click', function(){
        startEvent("images/prison.jpg", "", 'Перекусив, вы чувствуете себя намного лучше',0,0,0)
        if (hero.hp+40>100){
            hero.hp = 100;
        }else{
            hero.hp+=40;
        }
        rewriteStats()
        goLocation("prison")
    })
    btn2.addEventListener('click', function(){
        let rndNum = Math.floor(Math.random()*21)
        if (rndNum >= 0 && rndNum <= 7) {
            findBoss('Торгаш подзывает к себе заключенного: "Избавь меня от этого нытика..."', robber, "images/prison.jpg")
        }else if(rndNum > 7 && rndNum <= 14) {
            startEvent("images/prison.jpg","images/town/NoName.png", 'Торгаш презрительно фыркнул: "Обойдешься! Я честно, своими руками его украл!"',0,0,0);
            goLocation("prison")
        }else if(rndNum > 14 && rndNum < 22) {
            startEvent("images/prison.jpg","images/town/NoName.png", 'Торгаш сжалился над вами и отдал рулет просто так',0,0,0);
            if (hero.hp+40>100){
                hero.hp = 100;
            }else{
                hero.hp+=40;
            }
            rewriteStats()
            goLocation("prison")
        }
    })
    btn3.addEventListener('click', prisonEvent)
}


// -----------------------------------------------События леса------------------------------------------------------------------
//                      ------------------------------------------------------------------------
//                                              -----------------
function findHunter(){
    startEvent("images/forest/forestBg.jpg","images/hunter.png",'Вы встречаете опытного охотника из города. "Ты как, не потерялся? За небольшую плату могу вывести в город. Всего за '+Math.floor(hero.coins*0.2*10)/10+' золотых"',0,0,0)
    btnClose()
    btnCreate("Согласиться","Идти дальше","","")
    btnShow()
    btn1.addEventListener('click', function(){
        hero.coins-=Math.floor(hero.coins*0.2*10)/10
        rewriteStats()
        loopCount=0;
        forestLoopCount=0;
        goHub()
    })
    btn2.addEventListener('click', forestEvent)
}

function calmForest(){
    btnClose()
    startEvent("images/forest/forestBg.jpg","",'В лесу тихо и спокойно',0,0,0)
    btnCreate("Далее","","","")
    btnShow()
    btn1.addEventListener('click', forestEvent)
}

function findAltar() {
    startEvent("images/forest/forestBg.jpg","images/forest/altar.png","Вы находите алтарь со светящимся знаком репутации. Пришло время усилиться. Ваш урон: "+hero.dmg+". Скорость атаки: раз в " + hero.speed/1000+"с", 0,0,0)
    btnClose()
    btnCreate('Скорость -' + priceUpgrade + '<img src="images/rep.png"/>', 'Урон -' + priceUpgrade + '<img src="images/rep.png"/>',"Идти дальше","")
    btnShow()
    if (hero.rep<priceUpgrade){
        btn1.disabled = true;
        btn2.disabled = true;
    }else{
        btn1.disabled = false;
        btn2.disabled = false;
    }
    btn1.addEventListener('click', function(){})
    btn2.addEventListener('click', function(){
        hero.dmg = Math.floor(hero.dmg*1.1*10)/10
        document.getElementById("text").innerText = "Символ вспыхнул ярче. Теперь люди меньше вам доверяют, но вы стали сильнее. Ваш урон: "+hero.dmg+". Скорость атаки: раз в " + Math.floor(hero.speed/100)/10+"с"
        priceUpgrade = Math.floor(priceUpgrade *= 1.2)
        btn1.innerHTML = 'Скорость -' + priceUpgrade + '<img src="images/rep.png"/>';
        btn2.innerHTML = 'Урон -' + priceUpgrade + '<img src="images/rep.png"/>';
        if (hero.rep<priceUpgrade){
           btn1.disabled = true;
           btn2.disabled = true;
        }
        rewriteStats()
    })
    btn3.addEventListener('click', forestEvent)
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

//=======================================Главная петля. Выбор случайного события========================================
//                          ------------------------------------------------------------------
//                                          ---------------------------------
//Петля города
function townEvent(){
    locationHero = "town"
    btnClose()
    if (hero.hp<=0){
        death()
        return
    }
	if (loopCount<=10){
		loopCount++;
		let events = [woundedThief, findTresure, findThief, findKMB, findBasement, findGuard, woodClicker,findBeggar,findArenaBet, findCat] //Массив с функциями
		let rndNum = Math.floor(Math.random()*events.length)
		events[rndNum]()//Скобочки после массива вызовут функцию
	}else{
        day++;
        deposit += Math.floor(deposit * 2 /100*10)/10
        //document.getElementById("depositSum").innerText = deposit;
        goHub()
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
    }else{
        day++;
        deposit += Math.floor(deposit * 2 /100*10)/10
        goHub()
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
    }else if (forestLoopCount%10 ==0){
        findBoss("Лес - опасное, мистическое место. Помимо обычных обитателей здесь можно встретить жутких существ из страшных рассказов, которыми пугают детей в городе... Перед вами Крысиный Король", ratKing, 'images/forest/forestBg.jpg')
    }else if (forestLoopCount%10 == 1 && forestLoopCount!=1){
        findHunter()
    }else {
        let rndNum = Math.random()

        if (hero.hp<=0){
            death()
            return;
            //---Спокойный лес-----------------------------------
        }else if (rndNum>=0 && rndNum<0.2){
            calmForest()
            //---Охотник-----------------------------------------
        }else if (rndNum>=0.2 && rndNum<0.3){
            findHunter()
            //---Сражение----------------------------------------
        }else if (rndNum>=0.3 && rndNum<1){
            findFight()
        }
    }
}


function prisonEvent(){
    locationHero = "prison"
    btnClose()
    if (loopCount<=10){
        loopCount++;
        let events = [neighbor, arena, prisonMine,prisonFood, neighborFood] //Массив с функциями
        let rndNum = Math.floor(Math.random()*events.length)
        events[rndNum]()
    }else{
        day++;
        if (hero.rep<0){
            hero.rep = 0;
        }
        deposit += Math.floor(deposit * 2 /100*10)/10
        loopCount=0
        rewriteStats()
        goHub()
    }
}


// Стартовые функции
function goLocation(where){
    btnClose()
    btnCreate("Далее","","","")
    if (where=="town"){
        btn1.addEventListener("click", function() {
            townEvent()
        })
    }else if (where=="tavern"){
        btn1.addEventListener("click", function() {
            tavernEvent()
        })
    }else if (where=="forest"){
        btn1.addEventListener("click", function() {
            forestEvent()
        })
    }else if (where=="prison"){
        btn1.addEventListener("click", function() {
            prisonEvent()
        })
    }
    btnShow()
}


function goTavern(){
    startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", '',"Вы заходите в таверну. Лука - хозяин таверны, любезно позволяет вам ночевать здесь",0,0,0)
    btnClose()
    btnCreate("Тавернщик","Отдых","Врач","Назад")
    btnShow()
    btn1.addEventListener("click", findKeeper)
    btn2.addEventListener("click", tavernEvent)
    btn3.addEventListener("click", findHealer)
    btn4.addEventListener("click", goHub)
}

function goPrison(){
    startEvent("images/prison.jpg", '',"Чтож, за свои поступки нужно отвечать. Теперь вы в тюрьме",0,0,0)
}

function goHub(){
    startEvent("images/hub.jpg", "","День:"+day+". Куда отправляемся?",0,0,0)
    btnClose()
    btnCreate("В Город", "В Таверну", "В Лес", "")
    btnShow()
    btn1.addEventListener("click", townEvent);
    btn2.addEventListener("click", goTavern);
    btn3.addEventListener("click", forestEvent);
}

