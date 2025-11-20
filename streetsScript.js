let hero = {
    hp:100,
    maxHp:100,
    rep:0,
    coins:3,
    hunger: 40,
    dmg:5,
    speed: 150,
    day: 1,
    location: "",
    eat: function(food){
        if(this.hunger+food<=this.maxHp){
            this.hunger+=food;
        }else{
            this.hunger=100;
        }
    },
    heal: function(plusHp){
        if(this.hp+plusHp<=this.maxHp){
            this.hp+=plusHp;
        }else{
            this.hp=100;
        }
    },
    giveMoney: function(price){
        if(this.coins-price<0){
            this.coins=0
        }else{
            this.coins-=price
        }
    },
    attack: function(){
        enemy.hp -= hero.dmg;

        let enemyPercent = enemy.hp/enemy.hpMax * 100;
        let enemyHpBar = document.getElementById("enemyBar")
        enemyHpBar.style.width = enemyPercent + "%";
        if (enemyPercent >= 80){
            enemyHpBar.style.background = "#39a614";
        }else if (enemyPercent < 80 && enemyPercent > 40){
            enemyHpBar.style.background = "#a69314";
        }else{
            enemyHpBar.style.background = "#870101";
        }
        enemyReaction()

        var width = 100;
        var elem = document.getElementById("myBar");
        var mainElem = document.getElementById("myProgress");
        mainElem.classList.add("disabledDiv")
        elem.style.transition = hero.speed+'ms';
        var id = setInterval(frame, hero.speed/10);
        function frame() {
            if (width == 0) {
                mainElem.classList.remove("disabledDiv")
                clearInterval(id);
            } else {
                mainElem.classList.add("disabledDiv")
                width--;
                elem.style.width = width + "%";
            }
        }
    }
}

let inventory = {
    fish: 0,
    bait: 0,
}

let thatDay = []

let deposit = 0;
let depositArena = 0;


let eventCount = {
    merchantBuisness: 0,
    angryGranny: 0,
    needWood: 0,
    clickWood: 0,
    correctAnswers: 0,
    merCount: 0,
    volontiers:0,
    rode: 0,
}


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
                rewriteStats()
            }else if(hero.hp<=0){
                clearInterval(timer)
                if (hero.location=="prison"){
                    prisonHealer()
                }else{
                    death()
                }
            }else if(this.hp<=0){
                clearInterval(timer)
                document.getElementById("enemyBar").style.width = "100%";
                this.giveReward()
                this.hp = this.hpMax
                rewriteStats()
                outOfBattle()
                document.getElementById("text").innerText = "Вы победили. Награда: "+this.reward + " монет";
                btnCreate("Далее","","","")
                btnShow();
                if (hero.location=="forest"){
                    btn1.addEventListener("click", forestEvent)
                }else if (hero.location=="town"){
                    btn1.addEventListener("click", townEvent)
                }else if (hero.location=="tavern"){
                    btn1.addEventListener("click", tavernEvent)
                }else if (hero.location=="prison"){
                    btn1.addEventListener("click", prisonEvent)
                }
            }
        }, this.speed);
    };
    this.giveReward = function() { hero.coins +=this.reward; };
}

let spider = new enemyConstructor("Паук",15,2,500,"images/enemy/spider.png",1)
let rat = new enemyConstructor("Крыса",20,3,1000,"images/enemy/rat.png",2)
let dog = new enemyConstructor("Одичавшая собака",30,4,1500,"images/enemy/dog.png",5)


let disertir = new enemyConstructor("Дезертир", 40,5,1000,"images/town/guard.webp",7)
let robber = new enemyConstructor("Грабитель",30,6,1000,"images/town/thief.png",8)
let skeleton = new enemyConstructor("Скелет",40,7,1000,"images/enemy/skeleton.png",10)

let guard = new enemyConstructor("Стражник", 100,10,1000,"images/town/guard.webp",7)
let strider = new enemyConstructor("Бродяга", 35,4,1200,"images/town/NoName.png",5)


let evilGranny = new enemyConstructor("Демоническая бабка",100,20,3000,"images/town/evilgranny.webp",50)
let ratKing = new enemyConstructor("Крысинный король",50,4,1400,"images/enemy/ratKing.png",30)


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
    startEvent("images/forest/forestBg.jpg", enemy.img1, "На вас набрасывается "+enemy.name,0,0,0)
}

//появление сцены с битвой + атака врага
function fightScene(){
    btnClose()
    setTimeout(() => {
        endElementAnimation()
        document.getElementById("charImg").style.display = "none";
        document.getElementById("textBox").style.display = "none";
        document.getElementById("buttonBox").style.display = "none";
        document.getElementById("battleScene").style.display = "block";
        document.getElementById("myProgress").style.display = "block";
        document.getElementById("enemyImage").style.background = 'url('+enemy.img1+') center center no-repeat';
        document.getElementById("enemyImage").style.backgroundRepeat = "no-repeat";
        document.getElementById("enemyImage").style.backgroundPosition = "center";
        document.getElementById("enemyImage").style.backgroundSize = "contain";
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
    document.getElementById("charImg").style.display = "block";
    document.getElementById("textBox").style.display = "block";
    document.getElementById("buttonBox").style.display = "block";
    document.getElementById("battleScene").style.display = "none";
    document.getElementById("charImg").style.backgroundRepeat = "no-repeat";
    document.getElementById("charImg").style.backgroundPosition = "center";
    document.getElementById("charImg").style.backgroundSize = "contain";
}

function death(){
    hero.location = "tavern"
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
    startEvent(bgimg, enemy.img1, text,0,0,0)

    btnCreate("Сражаться","","","")
    btn1.addEventListener('click', fightScene)
    btnShow()
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
    eventCount.needWood = Math.floor(Math.random()*50);
    btnClose()
    startEvent("images/prison.jpg", "",'Пришла пора отрабатывать тюремную еду. Вас отправляют в шахты', 0,0,0)
    btnCreate("Добывать", "", "","");
    btnShow()
    btn1.addEventListener("click", function() {
        if (eventCount.clickWood < eventCount.needWood){
            eventCount.clickWood++
            document.getElementById("text").innerText = "Добыто руды "+eventCount.clickWood+" из "+(eventCount.needWood+1);
        }else{
            btnClose()
            rewriteStats()
            btnCreate("Далее","","","")
            btnShow()
            document.getElementById("text").innerText = "Дело сделано";
            eventCount.clickWood=0
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
        startEvent("images/prison.jpg", "images/town/guard.webp", 'Вот и пришло время обеда. Ого! В этот раз обычная каша. В чем подвох? +10 здоровья',10,0,0)
    }else if (rndNum>=0.33 && rndNum<0.66){
        startEvent("images/prison.jpg", "images/town/guard.webp", 'Вот и пришло время обеда. Это что, жареная крыса? Феее...',0,0,0)
    }else if (rndNum>=0.66 && rndNum<1){
        startEvent("images/prison.jpg", "images/town/guard.webp", 'Вот и пришло время обеда. Ого! В этот раз обычная каша? Съев пару ложек вы замечаете, что вам стало плохо... -20 здоровья',-20,0,0)
    }
}

function neighborFood(){
    startEvent("images/prison.jpg", "images/town/NoName.png", '"Эй, другалечек! Еда здесь поганая, да? Могу продать тебе этот изысканный сладкий рулет!"',0,0,0)
    btnClose()
    btnCreate("<img src='images/icons/hp.png'/>+40 <img src='images/icons/coins.png'/>-10","Жалобно выпросить","Дальше","")
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
//                                             -----------------

function findGlade(){
    btnClose()
    startEvent("images/forest/forestBg.jpg","", 'Вы находите на прекрасную поляну. Она вполне подойдет для привала. Отдохнем?',0,0,0);
    let rndNum = Math.floor(Math.random()*21)
    console.log(rndNum)
    btnCreate("Отдохнем!", "Идти дальше", "","");
    btnShow()
    btn1.addEventListener("click", function() {
        if (rndNum >= 0 && rndNum <= 7) {
            startEvent("images/forest/forestBg.jpg","", 'Где-то неподалеку воют волки, а совсем рядом слышен хруст веток. Здесь опасно останавливаться, привал отменяется.',0,0,0);
            goLocation("forest")
        }else if(rndNum > 7 && rndNum <= 14) {
            startEvent("images/forest/forestBg.jpg","", 'Немного взремнув, вы восстанавливаете силы. Пора двигаться дальше!',0,0,0);
            hero.heal(20)
            goLocation("forest")
        }else if(rndNum > 14) {
            startEvent("images/forest/forestBg.jpg","", 'Вы замечательно отдохнкли в тени раскидистого дуба. Неподалеку даже нашли куст съедобных ягод',0,0,0);
            hero.eat(40)
            hero.heal(40)
            goLocation("forest")
        }
    })
    btn2.addEventListener("click", forestEvent)
}


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
    startEvent("images/forest/forestBg.jpg","images/forest/altar.png","Вы находите алтарь со светящимся знаком репутации. Пришло время усилиться. Ваш урон: "+hero.dmg, 0,0,0)
    btnClose()
    btnCreate('Урон -' + priceUpgrade + '<img src="images/rep.png"/>',"Идти дальше","","")
    btnShow()
    if (hero.rep<priceUpgrade){
        btn1.disabled = true;
        //btn2.disabled = true;
    }else{
        btn1.disabled = false;
        //btn2.disabled = false;
    }
    btn1.addEventListener('click', function(){
        hero.dmg = Math.floor(hero.dmg*1.1*10)/10
        document.getElementById("text").innerText = "Символ вспыхнул ярче. Теперь люди меньше вам доверяют, но вы стали сильнее. Ваш урон: "+hero.dmg
        priceUpgrade = Math.floor(priceUpgrade *= 1.2)
        btn1.innerHTML = 'Урон -' + priceUpgrade + '<img src="images/icons/rep.png"/>';
        if (hero.rep<priceUpgrade){
           btn1.disabled = true;
        }
        hero.rep-=priceUpgrade
        rewriteStats()
    })
    btn2.addEventListener('click', forestEvent)
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

//------------Вход в пещеру-------------
barWidth = 50

function freeCaveStert(){
    btnClose()

    setTimeout(() => {
        endElementAnimation()
        document.getElementById("charImg").style.display = "none";
        document.getElementById("textBox").style.display = "none";
        document.getElementById("buttonBox").style.display = "none";
        document.getElementById("myProgress").style.display = "none";
        btnCreate("Разбирать","Сдаться","","")
        document.getElementById("fist").appendChild(btn1);
        document.getElementById("fist").appendChild(btn2);
        document.getElementById("battleScene").style.display = "block";
        document.getElementById("enemyImage").style.background = 'url("images/forest/cave.webp") center center no-repeat';
        document.getElementById("enemyImage").style.backgroundRepeat = "no-repeat";
        document.getElementById("enemyImage").style.backgroundPosition = "center";
        document.getElementById("enemyImage").style.backgroundSize = "contain";
        document.getElementById("enemyBar").style.width = barWidth+'%';
        document.getElementById("enemyBar").style.transition = "all 0.1s ease";

        btn1.addEventListener('click', barPlus)
        btn2.addEventListener('click', function () {
            outOfBattle()
            goHub()
        })

        bar()
    })
}

function barPlus(){
    let x = Math.floor(Math.random() * eventCount.volontiers*1.5)+1;
    barWidth+=x;
    document.getElementById("enemyBar").style.width = barWidth+'%';
    console.log("Сила добычи: ",x)
    console.log("Прогресс", barWidth)
}

function bar() {
    let timer = setInterval(() => {
        if (barWidth > 0 && barWidth < 100) {
            if (barWidth > 0) {barWidth--;}
            document.getElementById("enemyBar").style.width = barWidth+'%';

            if (barWidth >= 75){
                document.getElementById("enemyBar").style.background = "#39a614";
            }else if (barWidth < 75 && hero.hp >= 40){
                document.getElementById("enemyBar").style.background = "#a69314";
            }else if (barWidth<40){
                document.getElementById("enemyBar").style.background = "#a61414";
            }
        }else if (barWidth >= 100) {
            clearInterval(timer);
            outOfBattle()
            startEvent("images/forest/forestBg.jpg", "images/forest/cave2.webp", '"Дело сделано!"', 0, 0, 0)
        }
    }, 100);
}
//-------------------------------------Рыбалка-------------------------------------
function findFishing(){
    startEvent("images/fishBg.webp","",'Вы находите небольшое озеро. Кажется, это отличное место для рыбалки. Остановимся?',0,0,0)
    btnClose()
    btnCreate("Рыбачить","Идти дальше","","")
    btnShow()
    btn1.addEventListener('click', startFishing)
    if (hero.location == 'forest'){
        btn2.addEventListener('click', forestEvent)  //тест пройден
    }else if (hero.location == 'town'){
        btn2.addEventListener('click', townEvent)    //тест пройден
    }

}

let x;    //---------че ловим------------

function startFishing(){
    console.log('При нахождении рыбалки: '+hero.location);
    btnClose()
    let divMain= document.createElement("div");
    let divBar= document.createElement("div");
    divMain.classList.add("fishingDiv")
    divBar.classList.add("fishingDivBar");
    document.getElementById("buttonBox").appendChild(divMain);
    divMain.appendChild(divBar);
    divMain.style.display = "none";
    startEvent("images/fishBg.webp","",'Наживки: '+inventory.bait,0,0,0)
    btnCreate("Закинуть удочку","Тянуть","Хватит","")
    btnShow()
    btn2.disabled = true;

    btn1.addEventListener('click', function () {
        if (inventory.bait == 0){
            document.getElementById("text").innerText = 'Наживки нет, сегодня не порыбачим';
            return
        }
        btn3.disabled = true
        let boot = {img: "images/forest/boot.webp", power: 15, name: "старый ботинок. Вряд ли он пригодится"}
        let amulet = {img: "images/forest/amulet.webp", power: 6, name: "Амулет силы. Взяв его в руки вы чувстуете небывалую мощь, +0.5 урона."}
        let fish = {img: "images/forest/fish.webp", power: 9, name: "Рыба. Самая обычная и довольно вкусная, если верно приготовить. Можно продать"}

        let rndNum = Math.random();
        console.log(rndNum)
        if (0<= rndNum && rndNum <=0.1){
            x = amulet;
            console.log("АМУЛЕТ");
        }
        else if (0.1<rndNum && rndNum<=0.7){
            x = fish;
            console.log("РИБА");
        }
        else if (0.7<rndNum){
            x = boot;
            console.log("БОТ");
        }

        btn1.disabled = true;
        document.getElementById("text").innerText = 'Наживки: '+inventory.bait+'\nЖдем пока клюнет...';
        setTimeout(() => {
            divMain.style.display = "block";
            let timer = setInterval(() => {
                if (barWidth > 0 && barWidth < 100) {
                    btn2.disabled = false;
                    barWidth--;
                    divBar.style.width = barWidth+'%';
                    document.getElementById("text").innerText = 'Наживки: '+inventory.bait+'\n❗❗❗ ТЯНИ ❗❗❗';
                }else if (barWidth >= 100) {
                    clearInterval(timer);
                    barWidth=50;
                    divBar.style.width = barWidth+'%';
                    if (x==fish){inventory.fish++;}
                    else if (x==amulet){hero.dmg += 0.5}
                    inventory.bait--;
                    rewriteStats()
                    startEvent( "images/fishBg.webp",x.img,'Вы поймали: '+x.name+'\n Наживки: '+inventory.bait,0,0,0)
                    btn3.disabled = false
                    btn2.disabled = true;
                    btn1.disabled = false;
                }else{
                    clearInterval(timer);
                    barWidth=50;
                    divBar.style.width = barWidth+'%';
                    inventory.bait--;
                    startEvent("images/fishBg.webp","",'Рыбы: '+inventory.fish+'\n Наживки: '+inventory.bait,0,0,0)
                    btn3.disabled = false
                    btn2.disabled = true;
                    btn1.disabled = false;
                }
                console.log(barWidth);
            }, 100);
        },3000)
    })
    btn2.addEventListener('click', function () {
        let pwr = Math.floor(Math.random() * x.power);
        barWidth+=pwr;
        divBar.style.width = barWidth+'%';
    })
    btn3.addEventListener('click', function () {
        divMain.remove();
        if (inventory.fish > 0){
            btn3.addEventListener('click', findCooking())
        }else{
            if (hero.location == 'forest'){
                btn3.addEventListener('click', forestEvent())
            }else if (hero.location == 'town'){
                btn3.addEventListener('click', townEvent())
            }
        }
    })
}


let divMain;
let divBar;
let indicator;
let indicatorRange = 5;
let speed = 1;
let timerello;

function findCooking(){
    console.log('При нахождении готовке: '+hero.location);
    divMain= document.createElement("div");
    divBar= document.createElement("div");
    indicator= document.createElement("div");
    divMain.classList.add("mainBar")
    divBar.classList.add("winBar");
    indicator.classList.add("indicator");
    document.getElementById("buttonBox").appendChild(divMain);
    divMain.appendChild(divBar);
    divMain.appendChild(indicator);
    divMain.style.display = "none";
    btnClose()
    startEvent("images/fishBg.webp","images/forest/bonefire.webp",'Если ты голоден, можешь приготовить рыбу. Готовим?',0,0,0)
    btnCreate("Готовить","Идти дальше","","")
    btnShow()
    btn1.addEventListener('click', function () {
        if (inventory.fish>0){startCoocking()}
        else{document.getElementById("text").innerText = "У вас нет рыбы для готовки"}
    })
    btn2.addEventListener('click', function () {
        if (hero.location == 'forest'){
            divMain.remove();
            btn2.addEventListener('click', forestEvent())
        }else if (hero.location == 'town'){
            divMain.remove();
            btn2.addEventListener('click', townEvent())
        }
    })

}

function startCoocking(){
    btnClose()
    startEvent("images/fishBg.webp","images/forest/bonefire.webp",'Нажми, когда ползунок попадет в зеленую область',0,0,0)
    divMain.style.display = "block";
    btnCreate("Новая рыба","Жарить","Выйти","");
    btn2.disabled = true;
    btnShow()
    btn1.addEventListener('click', function (){
        if (inventory.fish<=0){
            startEvent("images/fishBg.webp","images/forest/bonefire.webp",'У вас больше нет рыбы',0,0,0)
            return
        }
        btn1.disabled = true;
        btn2.disabled = false;
        btn3.disabled = true;
        clearInterval(timerello);
        winRange= Math.floor(Math.random() * 20)+10;
        rangeMarginVar = Math.floor(Math.random() * 70)+5;
        divBar.style.width = winRange + '%';
        divBar.style.marginLeft = rangeMarginVar + '%';
        indicator.style.width = indicatorRange + '%';

        indicator.style.transition = 'all '+speed+'s linear';

        indicator.style.marginLeft = "100%";
        setTimeout(() => {
            indicator.style.marginLeft = "0%";
        } , speed*1000);
        timerello = setInterval(()=>{
            indicator.style.marginLeft = "100%";
            setTimeout(() => {
                indicator.style.marginLeft = "0%";
                console.log(indicator.offsetLeft);
            } , speed*1000);
        },speed*2000)
    })
    btn2.addEventListener('click', function (){
        clearInterval(timerello);
        btn2.disabled = true;
        btn1.disabled = false;

        winMargin = parseFloat(window.getComputedStyle(divBar).marginLeft);
        winWidth = parseFloat(window.getComputedStyle(divBar).width);

        indicatorMargin = parseFloat(window.getComputedStyle(indicator).marginLeft);
        indicatorWidth = parseFloat(window.getComputedStyle(indicator).width);

        if (indicatorMargin>=winMargin && indicatorMargin+indicatorWidth<=winMargin+winWidth){
            startEvent("images/fishBg.webp","images/forest/cookFish.webp",'Ты прекрасно справился и сытно перекусил! Еще разок?',0,0,0)
            inventory.fish--;
            hero.hunger+=20;
        }else {
            startEvent("images/fishBg.webp","images/forest/coalFish.webp",'Ты спалил ее в угли. Это явно не съедобно',0,0,0)
            inventory.fish--;
        }
        btn3.disabled = false;
    })
    btn3.addEventListener('click', function () {
        divMain.remove();
        if (hero.location == 'town'){
            townEvent()
        }else if (hero.location == 'forest'){
            forestEvent()
        }
    })
}






//=======================================Главная петля. Выбор случайного события========================================
//                          ------------------------------------------------------------------
//                                          ---------------------------------
//Петля города
function townEvent(){
    const events = [findFishing,townForest, townTavern, fishingBeggar,woundedThief, findTresure, findThief, findKMB, findBasement, findGuard, woodClicker,findBeggar,findArenaBet, findCat, findMerchant, findDude, indulgence, findBuisnessMerchant, fireBeggar] //Массив с функциями
    let listOfIndex = new Set();

    if (loopCount==0){  //Создаем массив без повторяющихся значений
        for(let i = 0; i < 10; i++) {
            let rndNum;
            do {
                rndNum = Math.floor(Math.random() * events.length);
            } while (listOfIndex.has(rndNum));
            listOfIndex.add(rndNum);
            thatDay.push(events[rndNum]);
        }
        if (eventCount.merCount==5){
            thatDay[3] = findMer;
            thatDay[7] = findMer;
        }else{
            thatDay[Math.floor(Math.random() * 10)] = findMer;
        }

    }

    hero.location = "town"
    btnClose()

    if (hero.hp<=0){
        death()
        return
    }

    if (loopCount<10){
        hero.hunger--;
        if (hero.hunger <= 0){
            hero.hunger = 0
            hero.hp -= 10;
        }
        console.log(thatDay)

        console.log(thatDay[loopCount]);
        console.log("круг: "+loopCount)

        thatDay[loopCount]()
        //events[0]()
        //findMer()
        loopCount++;
    }else{
        hero.day++;
        deposit += Math.floor(deposit * 2 /100*10)/10
        loopCount=0
        thatDay.length = 0;
        listOfIndex.clear();
        goHub()
    }
}

//Петля таверны
function tavernEvent(){
    hero.location = "tavern"
    btnClose()


    if (hero.hp<=0){
        death()
        return
    }
    if (loopCount<=10){
        loopCount++;
        if (hero.hunger < 100){
            hero.hunger+=5;
        }
        let events = [findSailor, findGossip, findCompany, fishingBeggar] //Массив с функциями
        let rndNum = Math.floor(Math.random()*events.length)
        events[rndNum]()//Скобочки после массива вызовут функцию
    }else{
        hero.day++;
        deposit += Math.floor(deposit * 2 /100*10)/10
        goHub()
        loopCount=0
    }
}

//Петля леса
function forestEvent() {
    console.log(forestLoopCount)
    hero.location = "forest"
    btnClose()
    if (eventCount.merCount < 3) {
        startEvent("images/forest/forestBg.jpg", "images/town/guard.webp", '"Гражданин, дальше ходу нет! По приказу главы города проход в лес закрыт! Возвращайся в город."', 0, 0, 0)
        goLocation('hub')
        return;
    }else if (eventCount.merCount >= 3 && eventCount.merCount < 5 && forestLoopCount==11) {
        startEvent("images/forest/forestBg.jpg", "images/forest/cave.webp", '"Перед вами вход в пещеру. Вход завален камнями и деревянными обломками. Дальше не пройти. Стоит пообщаться с главой города Уильямом"', 0, 0, 0)
        eventCount.merCount = 4
        document.getElementById("mainQuest").innerText="Задание: Рассказать о завале Уильяму, главе города";
        goLocation('hub')
        return;
    }else if (eventCount.merCount==5 && forestLoopCount==11) {
        btnClose()
        startEvent("images/forest/forestBg.jpg", "images/forest/cave.webp", "Ну чтож, пора за работу! Помощников найдено: "+eventCount.volontiers ,0,0,0)
        btnCreate("Работаем!","","","")
        btn1.addEventListener('click', freeCaveStert)
        btnShow()
        return;
    }


    document.getElementById("myBar").style.width = 0 + "%"

    forestLoopCount++
    hero.hunger--;

    if (hero.hunger <= 0) {
        hero.hunger = 0
        hero.hp -= 10;
    }
    console.log("Игровой круг: " + forestLoopCount)

    if (forestLoopCount % 9 == 0) {
        findAltar()
    } else if (forestLoopCount % 10 == 0) {
        findBoss("Лес - опасное, мистическое место. Помимо обычных обитателей здесь можно встретить жутких существ из страшных рассказов, которыми пугают детей в городе... Перед вами Крысиный Король", ratKing, 'images/forest/forestBg.jpg')
    } else if (forestLoopCount % 10 == 1 && forestLoopCount != 1) {
        findHunter()
    } else {
        let rndNum = Math.random()
        if (hero.hp <= 0) {
            death()
            return;
            //---Поляна------------------------------------------
        }else if (rndNum>=0.12 && rndNum<0.20){
            findGlade()
            //---Спокойный лес-----------------------------------
        }else if (rndNum>=0 && rndNum<0.05) {
            calmForest()
            //---Рыбалка-----------------------------------------
        }else if (rndNum>=0.05 && rndNum<0.12){
            findFishing()
            //---Охотник-----------------------------------------
        }else if (rndNum>=0.2 && rndNum<0.3){
            findHunter()
            //---Сражение----------------------------------------
        }else if (rndNum>=0.3 && rndNum<1) {
            findFight()
        }
    }
}

function prisonEvent(){
    hero.location = "prison"
    btnClose()
    if (loopCount<=10){
        loopCount++;
        console.log("Игровой круг тюрьмы", loopCount)
        let events = [neighbor, arena, prisonMine,prisonFood, neighborFood] //Массив с функциями
        let rndNum = Math.floor(Math.random()*events.length)
        events[rndNum]()
    }else{
        hero.day++;
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
        btn1.addEventListener("click", townEvent)
    }else if (where=="tavern"){
        btn1.addEventListener("click", tavernEvent)
    }else if (where=="forest"){
        btn1.addEventListener("click", forestEvent)
    }else if (where=="prison"){
        btn1.addEventListener("click", prisonEvent)
    }else if (where=="hub"){
        btn1.addEventListener("click", goHub)
    }
    btnShow()
}


function goTavern(){
    if (eventCount.merCount==0){
        startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", 'images/keeper.webp',"Хм, незнакомое лицо... Если ты к доктору - то вон сидит. Ко мне приходи когда монетой будешь богат, просто так не угощаю",0,0,0)
        btnClose()
        btnCreate("<img src='images/icons/hp.png'/>Врач","Назад","","")
        btnShow()
        btn1.addEventListener("click", findHealer)
        btn2.addEventListener("click", goHub)
        return
    }else if (eventCount.merCount==1){
        startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", 'images/keeper.webp','Вы заходите в таверну. Лука - хозяин таверны, взял письмо, прочитал и удивленно вскинул брови. "Чтож... Уильям попросил обеспечить тебе ночлег и еду, так что располагайся"',0,0,0)
        btnClose()
        eventCount.merCount=2
        document.getElementById("mainQuest").innerText="Задание: Заработать 10 репутации";
    }else{
        startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", '',"Вы заходите в таверну. Лука - хозяин таверны, любезно позволяет вам ночевать здесь",0,0,0)
        btnClose()
    }
    btnCreate("<img src='images/icons/rep.png'/><img src='images/icons/coins.png'/>Тавернщик","<img src='images/icons/hunger.webp'/>Отдых","<img src='images/icons/hp.png'/>Врач","Назад")
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
    loopCount=0
    forestLoopCount = 0
    console.log("Круг: ",loopCount)
    startEvent("images/hub.jpg", "","День "+hero.day+". Куда отправляемся?",0,0,0)
    btnClose()
    btnCreate("<img src='images/icons/rep.png'/>В Город", "<img src='images/icons/hp.png'/><img src='images/icons/hunger.webp'/>В Таверну", "<img src='images/icons/dmg.webp'/>В Лес", "")
    btnShow()
    console.log("Мер: ",eventCount.merCount);
    btn1.addEventListener("click", townEvent);
    btn2.addEventListener("click", goTavern);
    btn3.addEventListener("click", forestEvent);
}

