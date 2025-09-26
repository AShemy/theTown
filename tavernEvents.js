// ----------------------------------------------События таверны------------------------------------------------------------------
//                      ------------------------------------------------------------------------
//                                              -----------------
function findKeeper(){
    startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/keeper.png", '"Приветствую, тебе как обычно? В городе бывает неспокойно, советую оставить деньги у меня, на вкладе. Если возникнет проблема с местными - также обращайся."',0,0,0)
    btnClose()
    btnCreate("Репутация","Вклад","Назад","")
    btnShow()
    btn1.addEventListener("click", findReputation)
    btn2.addEventListener("click", findBusiness)
    btn3.addEventListener("click", goTavern)
}
// ===============Покупка репутации==================
function findReputation(){
    startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/keeper.png", '"Репутация - это твое лицо в обществе. Хорошая репутация открывает нужные двери, плохая - ненужные. Могу поправить твою репутацию за умеренную плату"',0,0,0)
    btnClose()
    btnCreate("<img src='images/rep.png'/>+1 <img src='images/coins.png'/>-10", "<img src='images/rep.png'/>+10 <img src='images/coins.png'/>-90","Назад","")
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
    startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/keeper.png", '"Лучший спопсоб приумножить деньги - вложить их в дело. Можешь передать часть своих кровных мне - потом заберешь больше" \n На счете: '+deposit,0,0,0)
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
    btnCreate("<img src=\"images/hp.png\"/>100 <img src=\"images/coins.png\"/>-7","Назад","","")
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
    startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/keeper.png", listOfGossip[rndNum], 0,0,0)
    btnClose()
    btnCreate("Сидеть дальше","","","")
    btnShow()
    btn1.addEventListener("click", tavernEvent)
}

function findCompany(){
    startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", '', "Вам стало скучно. В конце зала вы видите шумную компанию. Попробуете присоединиться к ним?",0,0,0)
    btnClose()
    btnCreate("Сидеть дальше","","","")
    btnShow()
    btn1.addEventListener("click", tavernEvent)
}

function talkCompany(){
    if (hero.rep>0){
        secondEvent("findCompany", "https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", 'images/town/NoName.png',"images/town/thief.png", 'За столом сидят местные работяги. "А, авантюрист! Ну, хорошему человеку мы всегда рады, присоединяйся!" Вы весело проводите время +2 репутации', 'За столом сидят местные бандиты. "Шел бы ты отсюда, лопушок. Такому простачку как ты за нашим столом места нет. И монеты гони, а то не поздоровится" -5 монет', 0,0,2,0,-5,0)
    }else if (hero.rep<=0){
        secondEvent("findCompany", "https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", 'images/town/NoName.png',"images/town/thief.png", 'За столом сидят местные работяги. "Хм... Наслышаны о тебе... Шел бы ты отсюда, пока зубы целы" -2 репутации', 'За столом сидят местные бандиты. "Ахаха, присаживайся с нами! Мы сорвали большой куш, давай отметим!". Вы славно проводите время, и даже успеваете умыкнуть кошель одного из бандитов +5 монет', 0,0,-2, 0,5,0)
    }
}

function findSailor(){
    startEvent("https://i.pinimg.com/originals/89/6f/ec/896fec223382a7e3b16226b48485eda9.jpg", "images/sailor.png", 'За столом сидит скучающий старый моряк. "Эй ты! Как там тебя... сыграем в кости?"',0,0,0)
    btnClose()
    btnCreate("Сидеть дальше","","","")
    btnShow()
    btn1.addEventListener("click", tavernEvent)
}

