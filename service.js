//-------------------------------------------Музыка--------------------------------
let audio = document.getElementById('background-music');
// Функция для отслеживания активности вкладки
let hasFocus = true;
let musicOnOfF = 0;

// Обработчики событий для отслеживания фокуса
window.addEventListener('focus', () => {
    if (musicOnOfF == 1) {
        hasFocus = true;
        audio.play();
    }
});

window.addEventListener('blur', () => {
    hasFocus = false;
    audio.pause();
});


function musicPlay(){
    if (musicOnOfF == 0 || window.focus()){
        audio.play();
        musicOnOfF=1;
    }else if(musicOnOfF == 1 || window.blur()){
        audio.pause()
        musicOnOfF=0;
    }
};

//------------------------------------------Профиль---------------------------------------------
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


//------------------------------------------Анимация---------------------------------------------
function startElementAnimation() {
    document.getElementById("textBox").style.transition = "opacity "+animSpeed+"s ease";
    document.getElementById("textBox").style.opacity = '0';
    document.getElementById("charImg").style.transition = "opacity "+animSpeed+"s ease";
    document.getElementById("charImg").style.opacity = '0';
    document.getElementById("buttonBox").style.transition = "opacity "+animSpeed+"s ease";
    document.getElementById("buttonBox").style.opacity = '0';
}

function endElementAnimation() {
    document.getElementById("textBox").style.transition = "opacity "+animSpeed+"s ease";
    document.getElementById("textBox").style.opacity = '1';
    document.getElementById("charImg").style.transition = "opacity "+animSpeed+"s ease";
    document.getElementById("charImg").style.opacity = '1';
    document.getElementById("buttonBox").style.transition = "opacity "+animSpeed+"s ease";
    document.getElementById("buttonBox").style.opacity = '1';
}

function enemyReaction(){
    document.getElementById("charImg").classList.remove("startEnemyAnimation");
    requestAnimationFrame(() => {
        document.getElementById("charImg").classList.add("startEnemyAnimation");
    });
}

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
    document.getElementById("hunger").innerText = hero.hunger;
    hero.coins = Math.floor(hero.coins*10)/10
    document.getElementById("coins").innerText = hero.coins;

    document.getElementById("heroHp").innerText = "Здоровье: "+ hero.hp;
    document.getElementById("heroCoins").innerText = "Монеты: "+ hero.coins;
    document.getElementById("heroRep").innerText = "Репутация: "+hero.rep;
    document.getElementById("heroDmg").innerText = "Урон: "+hero.dmg;
    document.getElementById("heroSpeed").innerText = "Скорость: "+hero.speed/1000 + " секунд";
}

function btnCreate(buttonText1, buttonText2, buttonText3, buttonText4){
    let first=null;
    let second=null;
    let third=null
    let fourth=null;

    if (buttonText2==""){
        first = document.createElement("button");
        first.innerHTML = buttonText1;
    }else if(buttonText3==""){
        first = document.createElement("button");
        first.innerHTML = buttonText1;
        second = document.createElement("button");
        second.innerHTML = buttonText2;
    }else if(buttonText4==""){
        first = document.createElement("button");
        first.innerHTML = buttonText1;
        second = document.createElement("button");
        second.innerHTML = buttonText2;
        third = document.createElement("button");
        third.innerHTML = buttonText3;
    }else{
        first = document.createElement("button");
        first.innerHTML = buttonText1;
        second = document.createElement("button");
        second.innerHTML = buttonText2;
        third = document.createElement("button");
        third.innerHTML = buttonText3;
        fourth = document.createElement("button");
        fourth.innerHTML = buttonText4;
    }
    btn1 = first;
    btn2 = second;
    btn3 = third;
    btn4 = fourth;
}

function btnShow(){
    setTimeout(() => {
        endElementAnimation()
        if (btn1 != null){
            document.getElementById("buttonBox").appendChild(btn1);
        }
        if (btn2 != null){
            document.getElementById("buttonBox").appendChild(btn2);
        }
        if (btn3 != null){
            document.getElementById("buttonBox").appendChild(btn3);
        }
        if (btn4 != null){
            document.getElementById("buttonBox").appendChild(btn4);
        }
    }, animSpeed*2000);
}

// скрытие всех кнопок
function btnClose(){
    if (btn1 != null){
        btn1.remove()
    }
    if (btn2 != null){
        btn2.remove()
    }
    if (btn3 != null){
        btn3.remove()
    }
    if (btn4 != null){
        btn4.remove()
    }
    setTimeout(() => {
        startElementAnimation()
    }, animSpeed*1000);
}

//----------------------------------------Создание типовых событий----------------------------
//Создание кнопок

//Сооздание вводных типовых событий (1 порядок). Введение в курс дела
// Параметры: id - идентификатор кнопки, img - изображение персонажа, evText - текст события
function startEvent(backimg, img, evText, evHp, evCoins, evRep){
    startElementAnimation()   //анимация, плавно скрываем предыдущее событие
    setTimeout(() => {
        document.getElementById("text").innerText = evText;
        document.getElementById("mainScreen").style.background = 'url('+backimg+') center center no-repeat';
        document.getElementById("mainScreen").style.backgroundSize = 'cover';
        document.getElementById("charImg").style.background = 'url('+img+')';
        document.getElementById("charImg").style.backgroundSize = "cover";
        document.getElementById("buttonBox").style.display = "block";
        rewriteStats()
    }, animSpeed*1000);  //--timeout - длительность анимации, меняем объекты, пока они скрыты
    setTimeout(() => {
        endElementAnimation("buttonBox")
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

function cheatCOINplus() {
    hero.coins += 100
    rewriteStats()
}

function cheatCOINminus() {
    hero.coins -= 100
    rewriteStats()
}

