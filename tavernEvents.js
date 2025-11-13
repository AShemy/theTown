// ----------------------------------------------События таверны------------------------------------------------------------------
//                      ------------------------------------------------------------------------
//                                              -----------------
function findKeeper(){
    startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/keeper.webp", '"Приветствую, тебе как обычно? В городе бывает неспокойно, советую оставить деньги у меня, на вкладе. Если возникнет проблема с местными - также обращайся."',0,0,0)
    btnClose()
    btnCreate("<img src='images/icons/rep.png'/>Репутация","<img src='images/icons/coins.png'/>Вклад","Назад","")
    btnShow()
    btn1.addEventListener("click", findReputation)
    btn2.addEventListener("click", findBusiness)
    btn3.addEventListener("click", goTavern)
}
// ===============Покупка репутации==================
function findReputation(){
    startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/keeper.webp", '"Репутация - это твое лицо в обществе. Хорошая репутация открывает нужные двери, плохая - ненужные. Могу поправить твою репутацию за умеренную плату"',0,0,0)
    btnClose()
    btnCreate("<img src='images/icons/rep.png'/>+1 <img src='images/icons/coins.png'/>-10", "<img src='images/icons/rep.png'/>+10 <img src='images/icons/coins.png'/>-90","Назад","")
    btnShow()
    btn1.disabled = ggBeggar(hero.coins,10)
    btn2.disabled = ggBeggar(hero.coins,90)
    btn1.addEventListener("click",function(){
        hero.coins -= 10;
        hero.rep++;
        btn1.disabled = ggBeggar(hero.coins,10)
        btn2.disabled = ggBeggar(hero.coins,90)
        rewriteStats()
    })
    btn2.addEventListener("click",function(){
        hero.coins -= 90;
        hero.rep +=10;
        btn1.disabled = ggBeggar(hero.coins,10)
        btn2.disabled = ggBeggar(hero.coins,90)
        rewriteStats()
    })
    btn3.addEventListener("click",findKeeper)
}
// ===================Вклад=======================
function findBusiness(){
    startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/keeper.webp", '"Лучший спопсоб приумножить деньги - вложить их в дело. Можешь передать часть своих кровных мне - потом заберешь больше. Не беру меньше 20 монет." \n На счете: '+deposit,0,0,0)
    btnClose()
    btnCreate("Добавить", "Убавить", "Назад","");
    if (deposit<20) {btn2.disabled = true;}
    btnShow()

    btn1.addEventListener("click", function(){
        hero.coins -= 20
        deposit += 20;
        document.getElementById("text").innerText = '"Лучший спопсоб приумножить деньги - вложить их в дело. Можешь передать часть своих кровных мне - потом заберешь больше" \n На счете: '+deposit;
        if (deposit>0){ btn2.disabled = false; }
        rewriteStats()
        btn1.disabled = ggBeggar(hero.coins,20);
    });
    btn2.addEventListener("click", function(){
        if (deposit<20){
            hero.coins+=deposit;
            deposit=0;
            btn2.disabled = true;
        }else{
            hero.coins += 20;
            deposit -= 20;
        }
        document.getElementById("text").innerText = '"Лучший спопсоб приумножить деньги - вложить их в дело. Можешь передать часть своих кровных мне - потом заберешь больше" \n На счете: '+deposit;
        rewriteStats();
        btn1.disabled = ggBeggar(hero.coins,20);
        if (deposit==0){btn2.disabled = true;}
    });
    btn3.addEventListener("click", findKeeper)
    btn1.disabled = ggBeggar(hero.coins,20);
    if (deposit==0){ btn2.disabled = true; }
}
//=====================Лекарь===============
function findHealer(){
    startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/healer.png", 'Лекарь отрывается от записей и поднимает взгляд на вас. "Что-то ты бледный... Рассказывай, что с тобой в этот раз"',0,0,0)
    btnClose()
    btnCreate("<img src=\"images/icons/hp.png\"/>100 <img src=\"images/icons/coins.png\"/>-7","Назад","","")
    btnShow()
    btn1.disabled = ggBeggar(hero.coins,7);

    btn1.addEventListener("click",function(){
        if (hero.hp>=100){
            startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/healer.png", '"Ты здоров как бык, не трать мое время! Ну что за народ пошел..."',0,0,0)
        }else{
            startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/healer.png", 'Врач бубнит под нос: "У кошечки боли, у собачки боли, у тебя не боли...". Затем резким движением прикладывает к ране подорожник: "Все, готово!"',0,0,0)
            hero.hp = 100;
            hero.coins -= 7;
            btn1.disabled = ggBeggar(hero.coins,7);
            rewriteStats()
        }
    })
    btn2.addEventListener("click",goTavern)
}

//===================События=====================
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
    startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/keeper.webp", listOfGossip[rndNum], 0,0,0)
    btnClose()
    btnCreate("Сидеть дальше","Уйти","","")
    btnShow()
    btn1.addEventListener("click", tavernEvent)
    btn2.addEventListener("click", goTavern)
}

function findCompany(){
    startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", '', "Вам стало скучно. В конце зала вы видите шумную компанию. Попробуете присоединиться к ним?",0,0,0)
    btnClose()
    btnCreate("Присоединиться","Сидеть дальше","Уйти","")
    btnShow()
    btn1.addEventListener("click", function (){
        let rndNum = Math.floor(Math.random()*21);
        if (hero.rep>=0){
            if (rndNum >= 0 && rndNum <= 10){
                startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", 'images/town/thief.png', 'За столом сидят местные бандиты. "Шел бы ты отсюда, лопушок. Такому простачку как ты за нашим столом места нет. И монеты гони, а то не поздоровится"',0,-5,0)
            }else if (rndNum>10){
                startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", 'images/town/NoName.png', 'А, авантюрист! Ну, хорошему человеку мы всегда рады, присоединяйся!" Вы весело и сытно проводите время!',0,0,2)
                hero.hunger+=10
            }
        }else if(hero.rep<0){
            if (rndNum >= 0 && rndNum <= 14){
                startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", 'images/town/NoName.png', 'За столом сидят местные работяги. "Хм... Наслышаны о тебе... Шел бы ты отсюда, пока зубы целы" -2 репутации',0,0,-2)
            }else if (rndNum>14){
                startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", 'images/town/thief.png', 'За столом сидят местные бандиты. "Ахаха, присаживайся с нами! Мы сорвали большой куш, давай отметим!". Вы славно проводите время, и даже успеваете умыкнуть кошель одного из бандитов +5 монет',0,5,0)
            }
        }
        btnClose()
        goLocation("tavern")
    })
    btn2.addEventListener("click", tavernEvent)
    btn3.addEventListener("click", goTavern)
}

function findSailor(){
    startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/sailor.png", 'За столом сидит скучающий старый моряк. "Эй ты! Как там тебя... сыграем в кости?"',0,0,0)
    btnClose()
    btnCreate("Сыграть","Далее","Уйти","")
    btnShow()
    btn1.addEventListener("click", cubeGame);
    btn2.addEventListener("click", tavernEvent)
    btn3.addEventListener("click", goTavern)
}

function cubeGame(){
    btnClose()
    document.getElementById("text").innerText = "Ставка: " + depositArena;
    if (hero.coins < 1) {
        startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/sailor.png", '"Без ставки играть не интересно. Приходи когда у тебя будут деньги"', 0, 0, 0)
        goLocation("tavern")
    } else {
        btnCreate("Добавить", "Убавить", "Готово", "");
        if (depositArena < 1) {
            btn2.disabled = true;
        }
        if (hero.coins < 1) {
            btn1.disabled = true;
        }
        btnShow()

        btn1.addEventListener("click", function () {
            hero.coins -= 1
            depositArena += 1;
            document.getElementById("text").innerText = "Ставка: " + depositArena;
            if (depositArena > 0) {
                btn2.disabled = false;
            }
            rewriteStats()
            btn1.disabled = ggBeggar(hero.coins, 1);
        });
        btn2.addEventListener("click", function () {
            if (depositArena < 1) {
                btn2.disabled = true;
            } else {
                hero.coins += 1;
                depositArena -= 1;
            }
            document.getElementById("text").innerText = "Ставка: " + depositArena;
            rewriteStats();
            btn1.disabled = ggBeggar(hero.coins, 1);
            if (depositArena == 0) {
                btn2.disabled = true;
            }
        });
        btn3.addEventListener("click", function () {
            let cubeGG = Math.floor(Math.random()*6)+1;
            let cubeEnemy = Math.floor(Math.random()*6)+1;
            btnClose()
            if (cubeGG<cubeEnemy){
                startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/sailor.png", '"У меня выпало '+cubeEnemy+',\n а утебя '+ cubeGG + '.\n Хочешь отыгаться?',0,0,0)
            }else if (cubeGG>cubeEnemy){
                startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/sailor.png", '"У меня выпало '+cubeEnemy+',\n а утебя '+ cubeGG + '.\n Посейдонова борода! Ты победил. Давай еще разок?',0,0,0)
                hero.coins += depositArena*2;
            }else {
                startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/sailor.png", '"У меня выпало '+cubeEnemy+',\n а утебя '+ cubeGG + '.\n Эх, ничья... Так дела не делаются. Сыграем еще?',0,0,0)
                hero.coins += depositArena
            }
            depositArena=0
            btnCreate("Сыграть","Далее","","")
            btnShow()
            btn1.addEventListener("click", cubeGame);
            btn2.addEventListener("click", tavernEvent)
        })
    };
}

