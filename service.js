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
    document.getElementById("enemyImage").classList.remove("startEnemyAnimation");
    requestAnimationFrame(() => {
        document.getElementById("enemyImage").classList.add("startEnemyAnimation");
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

    // полоски статов - здоровье
    document.getElementById("ggBar").style.width = hero.hp + "%";
    ggBar.style.background = 'url("images/icons/hp.png") left center no-repeat';
    ggBar.style.backgroundSize = 'contain';
    if (hero.hp >= 75){
        ggBar.style.background = "#39a614";
    }else if (hero.hp < 75 && hero.hp >= 40){
        ggBar.style.background = "#a69314";
    }else if (hero.hp<40){
        ggBar.style.background = "#a61414";
    }

    // полоски статов - голод
    document.getElementById("hungerBar").style.width = hero.hunger + "%";
    if (hero.hunger >= 75){
        hungerBar.style.background = "#ffaf00";
    }else if (hero.hunger < 75 && hero.hunger >= 40){
        hungerBar.style.background = "#ff4d00";
    }else{
        hungerBar.style.background = "#870101";
    }

    // текстовые статы - репутация и здоровье
    document.getElementById("rep").innerText = hero.rep;
    hero.coins = Math.floor(hero.coins*10)/10
    document.getElementById("coins").innerText = hero.coins;

    document.getElementById("heroHp").innerText = 'Здоровье: '+ hero.hp +"  |  | Монеты: "+ hero.coins + "  |  | Репутация: "+hero.rep;
    document.getElementById("heroDmg").innerText = "Сытость: "+hero.hunger +" |  | Урон: "+hero.dmg;
    //document.getElementById("heroSpeed").innerText = "Скорость: "+hero.speed/1000 + " секунд";

    let textInv = document.getElementById("inventory")
    textInv.innerText = "В инвентаре: "
    if (inventory.fish != 0){
        textInv.innerText += "Рыба - "+ inventory.fish+" шт. ";
    }
    if (inventory.bait != 0){
        textInv.innerText += "Наживка - "+ inventory.bait+" шт. ";
    }


    const questLine = ["Пройтись по городу","Отнести письмо в таверну","Заработать 10 репутации","Разведать лес","Сообщить Уильяму о завале","Найти добровольцев или разобрать завал самому. Добровольцев собрано: "+eventCount.volontiers,"",]
    document.getElementById("mainQuest").innerText="Задание: "+questLine[eventCount.merCount];

    document.getElementById("numberQuest").innerText = "Номер квеста: "+eventCount.merCount;
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
        hero.hp+=evHp;
        if (hero.coins>=evCoins*-1){
            hero.coins+=evCoins;
        }else{
            hero.coins = 0
        }
        hero.rep+=evRep;
        rewriteStats()
    }, animSpeed*1000);  //--timeout - длительность анимации, меняем объекты, пока они скрыты
    setTimeout(() => {
        endElementAnimation("buttonBox")
    }, animSpeed*2000);    //timeout - длительность анимации x2, плавно появляется событие

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

function cheatHunger() {
    hero.hunger = 100
    rewriteStats()
}

function cheatFish() {
    inventory.fish += 1
    rewriteStats()
}


function plusMer(){
    eventCount.merCount++;
    document.getElementById("merProfile").innerHTML = "Мер: "+ eventCount.merCount;
}

function plusVolon(){
    eventCount.volontiers++;
    document.getElementById("volonProfile").innerHTML = "Волонтеры: "+ eventCount.volontiers;

}

function goFishing(){
    inventory.bait = 20;
    document.getElementById('heroProfile').style.display = 'none'
    findFishing()
}


