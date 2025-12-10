let inventory = {
    fish:{
        count1: 0,
        img: "images/forest/fish.webp",
        info: "Обычная речная рыба. Если правильно приготовить - довольно вкусная",
        usageText: "",
        canUse: false,
        use: "Этот предмет нельзя использовать",
    },
    coockedFish:{
        count1: 1,
        img: 'images/forest/cookFish.webp',
        info: "Жареная рыба. Лучшая еда, если ты в походе. Поймал, пожарил, съел. Пальчики оближешь. При использовании дает 20 сытости",
        canUse: true,
        usageText: "Хрум-хрум. Только что вам было очень вкусно",
        use: function(){
            hero.eat(20)
            rewriteStats()
            return
        },
    },
    bait:{
        count1: 0,
        img: 'images/forest/bait.webp',
        info: "Наживка. Без нее не выловишь рыбку из пруда",
        usageText: "",
        canUse: false,
        use: "Этот предмет нельзя использовать",
    },
}

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

//----------------------------------------Сохранение------------------------------------





//------------------------------------------Профиль---------------------------------------------
let profileOnOfF = 0;
function showProfile(){
    if (profileOnOfF == 1){
        //document.getElementById("heroProfile").style.display = "none";
        profileOnOfF=0
        prof.style.display="none"
    }else if(profileOnOfF == 0){
        //document.getElementById("heroProfile").style.display = "block";
        profileOnOfF=1
        openProfile()
        inventoryUpdate()
        openInv()
    }
};


let prof = document.createElement('div');
let questLine = ["Пройтись по городу","Отнести письмо в таверну","Заработать 10 репутации","Разведать лес","Сообщить Уильяму о завале","Найти добровольцев или разобрать завал самому. Добровольцев собрано: "+eventCount.volontiers,"",]
const paragraph = document.createElement('p');

function openProfile(){
    prof.classList.add('heroProfile');
    document.body.appendChild(prof);
    prof.appendChild(paragraph);

    prof.style.display = 'flex';
    prof.style.flexDirection = 'column';
    paragraph.innerText = "Задание: "+questLine[eventCount.merCount]+'\nЗдоровье: '+ hero.hp +"  |  | Монеты: "+ hero.coins + "  |  | Репутация: "+hero.rep+'\nСытость: '+hero.hunger +" |  | Урон: "+hero.dmg;
}

//----------------------------------------Инвентарь--------------------------------------------
let switch1 = 0;
let inv = document.createElement("div");;
let invMngr = document.createElement("div");
const listItems = [inventory.fish, inventory.coockedFish, inventory.bait]; // !!!!Список всех вещей
let listItemsFull = [];// Список всех вещей больше 0. Пока пустой

function inventoryUpdate(){
    listItemsFull = [];
    inv.innerHTML = "";
    invMngr.innerHTML = "";
    invMngr.remove();
    inv.remove();
}

function openInv(){
        const opisanie = document.createElement("p"); // параграф с орисанием
        const btnInv = document.createElement("div"); //
        const btnUse  = document.createElement("button");
        const btnDrop = document.createElement("button");
        let itemNum; // порядковый номер выбранного элемента инвентаря

        inv.classList.add("inventory");
        prof.appendChild(inv); // Добавляем инвентарь в нужный элемент кода

        // ------------------------------- Инвентарь-----------------------------------
        for (let item of listItems){
            if (item.count1>0){
                listItemsFull.push(item);  // Наполняем список вещей > 0
            }
        }

        for (let i = 0; i < listItemsFull.length; i++) {  // цикл создания заполненных ячеек
            const div = document.createElement("div"); // Это ячейка
            divCount = document.createElement("div")// Это количество предмета
            div.classList.add("cell");
            divCount.classList.add("count");
            inv.appendChild(div);
            div.appendChild(divCount);

            inv.children[i].style.background = 'url('+listItemsFull[i].img+') center center no-repeat, radial-gradient(#ecd0a4, #4e4944)';
            inv.children[i].style.backgroundSize = "cover";
            divCount.innerHTML = listItemsFull[i].count1;

            inv.children[i].addEventListener("click", function(){   // Вывод информации
                itemNum = i;
                console.log("Номер элемента: "+itemNum);
                for (let elementNum=0; elementNum<listItemsFull.length; elementNum++){  // Всем элементам даем оригинальный цвет (беж)
                    inv.children[elementNum].style.background = 'url('+listItemsFull[elementNum].img+') center center no-repeat, radial-gradient(#ecd0a4, #4e4944)';
                    inv.children[elementNum].style.backgroundSize = "cover";
                }
                opisanie.innerHTML = listItemsFull[i].info;
                inv.children[i].style.background = 'url('+listItemsFull[i].img+') center center no-repeat, radial-gradient(#659dfa, #1a5b83)'; // меняем цвет на синий при нажатии
                inv.children[i].style.backgroundSize = "cover";
            })
        }

        for (let i = 0; i < 9-listItemsFull.length; i++){  // цикл НЕ заполненных ячеек
            const div = document.createElement("div");
            div.classList.add("cell");
            inv.appendChild(div);
        }

        //  -------------------------------- Менеджер -------------------------------
        invMngr.classList.add("inventory");
        invMngr.style.height = "20vh"
        invMngr.style.marginBottom = "2%"
        prof.appendChild(invMngr);

        opisanie.innerHTML = "Описание";
        btnInv.classList.add("invBtn");

        invMngr.appendChild(opisanie);
        invMngr.appendChild(btnInv);

        btnUse.innerHTML = "Использовать";
        btnDrop.innerHTML = "Выкинуть";
        btnInv.appendChild(btnUse);
        btnInv.appendChild(btnDrop);

        btnUse.addEventListener("click", function(){ // Использвать
            if (listItemsFull[itemNum].canUse && listItemsFull[itemNum].count1>1){
                listItemsFull[itemNum].count1-=1;
                opisanie.innerText = listItemsFull[itemNum].usageText;
                listItemsFull[itemNum].use();
                inv.children[itemNum].children[0].innerHTML = listItemsFull[itemNum].count1; //получили доступ к счетчику кол-ва предмета
            }else if(!listItemsFull[itemNum].canUse){
                opisanie.innerHTML = "Этот предмет нельзя использовать";
            }else if(listItemsFull[itemNum].count1<=1){
                listItemsFull[itemNum].count1-=1;
                listItemsFull[itemNum].use();
                opisanie.innerText = listItemsFull[itemNum].usageText;
                switch1 = 0
                inventoryUpdate()
                openInv()
            }
        })

        btnDrop.addEventListener("click", function(){   // Удаление
            if (listItemsFull[itemNum].count1>1){
                listItemsFull[itemNum].count1-=1;
                inv.children[itemNum].children[0].innerHTML = listItemsFull[itemNum].count1; //получили доступ к счетчику кол-ва предмета
            }else if (listItemsFull[itemNum].count1<=1){
                listItemsFull[itemNum].count1-=1;
                opisanie.innerHTML = "Предмет закончился";
                switch1 = 0
                inventoryUpdate();
                openInv()
            }
        });
}


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

function cutReaction(){
    document.getElementById("cut").classList.remove("cutAnim");
    requestAnimationFrame(() => {
        document.getElementById("cut").classList.add("cutAnim");
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

    paragraph.innerText = "Задание: "+questLine[eventCount.merCount]+'\nЗдоровье: '+ hero.hp +"  |  | Монеты: "+ hero.coins + "  |  | Репутация: "+hero.rep+'\nСытость: '+hero.hunger +" |  | Урон: "+hero.dmg;
    //inventoryUpdate();

    hero.coins = Math.floor(hero.coins*10)/10

    // текстовые статы - репутация и здоровье
    //document.getElementById("rep").innerText = hero.rep;

    //document.getElementById("coins").innerText = hero.coins;
//
    //document.getElementById("heroHp").innerText = 'Здоровье: '+ hero.hp +"  |  | Монеты: "+ hero.coins + "  |  | Репутация: "+hero.rep;
    //document.getElementById("heroDmg").innerText = "Сытость: "+hero.hunger +" |  | Урон: "+hero.dmg;


    //let textInv = document.getElementById("inventory")
    //textInv.innerText = "В инвентаре: "
    //if (inventory.fish != 0){
    //    textInv.innerText += "Рыба - "+ inventory.fish+" шт. ";
    //}
    //if (inventory.bait != 0){
    //    textInv.innerText += "Наживка - "+ inventory.bait+" шт. ";
    //}
//
//
    //document.getElementById("mainQuest").innerText="Задание: "+questLine[eventCount.merCount];
//
    //document.getElementById("numberQuest").innerText = "Номер квеста: "+eventCount.merCount;
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
            document.getElementById("text").innerHTML = evText;
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


