//---------------------------------------------Случайные события в городе-----------------------------------------
//                                 -----------------------------------------------------
//                                                   ---------------

// <img src='images/icons/hp.png'/>+40 <img src='images/icons/coins.png'/>-10
function test(){
    btnClose()
    startEvent('images/town/town.jpg',"images/town/персонаж", 'текст события',0,0,0);
    let rndNum = Math.floor(Math.random()*22)+hero.dmg
    console.log(rndNum)
    btnCreate("Кнопка1", "Кнопка2", "","");
    btnShow()
    btn1.addEventListener("click", function() {
        if (rndNum >= 0 && rndNum <= 7) {
            startEvent('images/town/town.jpg',"images/town/персонаж", 'текст события',0,0,0);
            goLocation("town")
        }else if(rndNum > 7 && rndNum <= 14) {
            startEvent('images/town/town.jpg',"images/town/персонаж", 'текст события',0,0,0);
            goLocation("town")
        }else if(rndNum > 14 && rndNum < 22) {
            startEvent('images/town/town.jpg',"images/town/персонаж", 'текст события',0,0,0);
            goLocation("town")
        }
    })
    btn2.addEventListener("click", function() {
        if (rndNum >= 0 && rndNum <= 7) {
            startEvent('images/town/town.jpg',"images/town/персонаж", 'текст события',0,0,0);
            goLocation("town")
        }else if(rndNum > 7 && rndNum <= 14) {
            startEvent('images/town/town.jpg',"images/town/персонаж", 'текст события',0,0,0);
            goLocation("town")
        }else if(rndNum > 14 && rndNum < 22) {
            startEvent('images/town/town.jpg',"images/town/персонаж", 'текст события',0,0,0);
            goLocation("town")
        }
    })
}

//=======================Глава================================
function findMer(){
    btnClose("Мер: ",eventCount.merCount)
    console.log()
    if (eventCount.merCount==0){
        startEvent('images/town/town.jpg',"images/town/mer.webp", '"Приветствую, путник. Я Уильям, глава этого славного города. Ты выглядишь голодным и измотаным. Окажи мне услугу? Отнеси это письмо Луке, хозяину таверны. В награду он накормит тебя и даст ночлег"',0,0,0);
        btnCreate("Ладно", "","","");
        btnShow()
        eventCount.merCount=1;
        //document.getElementById("mainQuest").innerText="Задание: Отнести письмо в таверну";
        btn1.addEventListener("click", townEvent)
    }else if (eventCount.merCount==1){
        startEvent('images/town/town.jpg',"images/town/mer.webp", '"Не забудь отнести письмо Луке - хозяину таверны"',0,0,0);
        btnCreate("Хорошо", "","","");
        btnShow()
        btn1.addEventListener("click", townEvent)
    }else if (hero.rep>=10 && eventCount.merCount==2){
        startEvent('images/town/town.jpg',"images/town/mer.webp", '"А, путник! За тебя уже замолвили слово несколько честных людей. Кажется, на тебя можно положиться."',0,0,0);
        btnCreate("Нужна помощь?", "До встречи!","");
        btnShow()
        btn1.addEventListener("click", merQuest)
        btn2.addEventListener("click", townEvent)
    }else if (hero.rep<10 && eventCount.merCount==2){
        startEvent('images/town/town.jpg',"images/town/mer.webp", '"Приветствую, путник. Этому месту нужны добрые и честные люди, надеюсь, ты из таких. Когда соберешь достаточно репутации - приходи ко мне. Я найду для тебя важные задания."',0,0,0);
        btnCreate("Далее", "Нужно 10 <img src='images/icons/rep.png'>","","");
        btnShow()
        btn2.disabled = true;
        btn1.addEventListener("click", townEvent)
    }else if(eventCount.merCount==3){
        startEvent('images/town/town.jpg',"images/town/mer.webp", '"У тебя уже есть задание, путник"',0,0,0);
        btnCreate("Далее", "","","");
        btnShow()
        btn1.addEventListener("click", townEvent)
    }else if (eventCount.merCount==4){
        startEvent('images/town/town.jpg',"images/town/mer.webp", '"Авантюрист! Спасибо, что помогаешь нашему городу! Нам нужны такие люди как ты"',0,0,0);
        btnCreate("Поговорить", "До встречи!","");
        btnShow()
        btn1.addEventListener("click", merQuest)
        btn2.addEventListener("click", townEvent)
    }else if (eventCount.merCount==5){
        btnClose()
        startEvent('images/town/town.jpg',"images/town/персонаж", 'Пришло время искать добровольцев. Найдено: ' + eventCount.volontiers +" из 5",0,0,0);
        let rndNum = Math.floor(Math.random()*22)
        console.log(rndNum)
        btnCreate("Искать", "Не хочу", "","");
        btnShow()
        btn1.addEventListener("click", function() {
            btnClose()
            if (rndNum >= 0 && rndNum <= 7) {
                startEvent('images/town/town.jpg',"images/town/guard.webp", 'Я пойду только с честным и достойным человеком',0,0,0);
                btnCreate("Нужно 20 <img src='images/icons/rep.png'>","Найду другого","","");
                btnShow()
                if (hero.rep<20){btn1.disabled = true;}
                else{btn1.disabled = false;}
            }else if(rndNum > 7 && rndNum <= 14) {
                startEvent('images/town/town.jpg',"images/town/merchant.webp", 'А сколько платите?',0,0,0);
                btnCreate("Нужно 20 <img src='images/icons/coins.png'>","Найду другого","","");
                btnShow()
                if (hero.coins<20){btn1.disabled = true;}
                else{btn1.disabled = false;}
            }else if(rndNum > 14 && rndNum < 22) {
                startEvent('images/town/town.jpg',"images/town/NoName.png", 'В лесу опасно. Ты сможешь нас защитить?',0,0,0);
                btnCreate("Нужно 7 <img src='images/icons/dmg.webp'>","Найду другого","","");
                btnShow()
                if (hero.dmg<7){btn1.disabled = true;}
                else{btn1.disabled = false;}
            }
            btn1.addEventListener("click", merQuest)
            btn2.addEventListener("click", townEvent)
        })
        btn2.addEventListener("click", townEvent)
    }
}

function merQuest(){
    btnClose()
    if (eventCount.merCount==2) {
        startEvent('images/town/town.jpg', "images/town/mer.webp", '"В местном лесу нынче неспокойно. Дикое зверье да всякие чудища все ближе подбираются к городу. Мне нужны смельчаки, которые расчистят лес от заразы. Берешься?"', 0, 0, 0);
        btnCreate("Берусь", "Не сейчас", "");
        btnShow()
        btn1.addEventListener("click", function () {
            btnClose()
            startEvent('images/town/town.jpg', "images/town/mer.webp", '"Отлично! Я дам стражникам приказ пропустить тебя в лес."', 0, 0, 0);
            eventCount.merCount = 3;
            //document.getElementById("mainQuest").innerText="Задание: Разведать лес";
            goLocation('town')
        })
        btn2.addEventListener("click", function () {
            btnClose()
            startEvent('images/town/town.jpg', "images/town/mer.webp", '"Понимаю, риск большой. Как передумаешь - дай знать"', 0, 0, 0);
            goLocation("town")
        })
    }else if (eventCount.merCount==4){
        startEvent('images/town/town.jpg',"images/town/mer.webp", '"Завал, говоришь? Подозрительно... В любом случае, нужно собрать людей и расчистить пещеру. Я соберу своих, а ты пока пройдись по городу и поищи добровольцев"',0,0,0);
        btnCreate("Хорошо", "Не сейчас","");
        btnShow()
        btn1.addEventListener("click", function (){
            btnClose()
            startEvent('images/town/town.jpg',"images/town/mer.webp", '"Спасибо тебе, авантюрист. Ну, не будем терять ни минуты!"',0,0,0);
            eventCount.merCount = 5;
            //document.getElementById("mainQuest").innerText="Задание: Найти добровольцев или разобрать завал самому. Добровольцев собрано: "+eventCount.volontiers;
            goLocation('town')
        })
        btn2.addEventListener("click", function (){
            btnClose()
            startEvent('images/town/town.jpg',"images/town/mer.webp", '"У всех свои дела, но помни, я расчитываю на твою помощь!"',0,0,0);
            goLocation("town")
        })
    }else if (eventCount.merCount==5){
        btnClose()
        eventCount.merCount=6
        startEvent('images/town/town.jpg',"images/town/mer.webp", '"Добровольцев собрано: "'+eventCount.volontiers+'. Еще один помощник? Отлично! Как думаешь, справимся?',0,0,0);
        btnCreate("Выдвигаемся!","Пока нет","","");
        btn1.addEventListener("click", forestEvent)
        btn2.addEventListener("click", townEvent)
        btnShow()
    }
}



//====================Торговец=================================
function findMerchant(){
    btnClose()
    let rndNum = Math.floor(Math.random()*21)
    if (rndNum >= 0 && rndNum <= 10) {
        startEvent('images/town/town.jpg',"images/town/merchant.webp", 'По пути вы встречаете торговца. "Пирожки, горячие, свежие пирожки! Налетай, торопись, пирожком угостись!"',0,0,0);
        let rndNum = Math.floor(Math.random()*21)
        console.log(rndNum)
        btnCreate("<img src='images/icons/hunger.webp'/>=100 <img src='images/icons/coins.png'/>-20", "Далее","");
        btn1.disabled = ggBeggar(hero.coins, 20)
        btnShow()
        btn1.addEventListener("click", function() {
            if (rndNum >= 0 && rndNum <= 7) {
                startEvent('images/town/town.jpg',"", 'Довольный торговец берет деньги и спешно уходит. Вы пробуете пирожок... Буэ... В начинке тухлое мясо?!',0,0,0);
                hero.coins-=20;
                goLocation("town")
            }else if(rndNum > 7) {
                startEvent('images/town/town.jpg',"images/town/merchant.webp", 'Довольный торговец пересчитывает монеты. "Приятного аппетита, путник!". Теперь вы сыты',0,0,0);
                hero.hunger = 100;
                hero.coins-=20;
                goLocation("town");
            }
        })
        btn2.addEventListener("click", townEvent)
    }else if (rndNum >= 11){
        startEvent('images/town/town.jpg',"images/town/merchant.webp", 'По пути вы встречаете торговца. "Амулеты силы! Стань мощнее чем 10 медведей!"',0,0,0);
        let rndNum = Math.floor(Math.random()*21)
        console.log(rndNum)
        btnCreate("<img src='images/icons/dmg.webp'/>+10% <img src='images/icons/coins.png'/>-50", "Далее","");
        btn1.disabled = ggBeggar(hero.coins, 50)
        btnShow()
        btn1.addEventListener("click", function() {
            if (rndNum >= 0 && rndNum <= 7) {
                startEvent('images/town/town.jpg',"", 'Довольный торговец берет деньги и спешно уходит. Вы надеваете амулет... ничего не происходит. Вас явно обманули, это пустышка',0,0,0);
                hero.coins-=50;
                goLocation("town")
            }else if(rndNum > 7) {
                startEvent('images/town/town.jpg',"images/town/merchant.webp", 'Довольный торговец пересчитывает монеты. Вы надеваете амулет... Вы чувствуете небывалую мощь в своих руках. Урон увеличен',0,0,0);
                hero.dmg = Math.floor(hero.dmg*1.1*10)/10
                hero.coins-=50;
                goLocation("town");
            }
        })
        btn2.addEventListener("click", townEvent)
    }
}

function findBuisnessMerchant() {
    console.log(eventCount.merchantBuisness)
    btnClose()
    if (eventCount.merchantBuisness == 0) {
        startEvent('images/town/town.jpg', "images/town/merchant.webp", 'По пути вы встречаете торговца. "Пс, приятель! Я хочу создать палатку с лучшими товарами со всего света, но мне не хватает денег. Если поможешь деньгами, в будущем буду делиться частью выручки!"', 0, 0, 0);
        btnCreate("<img src='images/icons/coins.png'/>-30", "Пройти мимо", "", "");
        btnShow()
        btn1.disabled = ggBeggar(hero.coins, 30)
        btn1.addEventListener("click", function () {
            startEvent('images/town/town.jpg', "images/town/merchant.webp", '"Теперь я могу называть тебя коллегой! В следующий раз ты увидишь результаты своего вклада!"', 0, 0, 0);
            hero.coins -= 30;
            eventCount.merchantBuisness++;
            goLocation("town");
        });
        btn2.addEventListener("click", townEvent);
    }else if (eventCount.merchantBuisness == 1){
        startEvent('images/town/town.jpg',"images/town/merchant.webp", 'По пути вы встречаете торговца. "А, коллега! Прошлая закупка дала неплохой доход, твоя доля +5 монет!"',0,5,0);
        eventCount.merchantBuisness++;
        btnCreate("Хорошо...", "","","");
        btnShow()
        btn1.addEventListener("click", townEvent);
    }else if (eventCount.merchantBuisness == 2){
        startEvent('images/town/town.jpg',"images/town/merchant.webp", 'По пути вы встречаете торговца. "Коллега! Работа идет, вот очередные 5 монет! Кстати, не желаешь вложить еще? Обещаю, в этот раз прибыль будет еще больше!"',0,5,0);
        btnCreate("<img src='images/icons/coins.png'/>-80", "Пройти мимо", "","");
        btnShow()
        btn1.disabled = ggBeggar(hero.coins, 80)
        btn1.addEventListener("click", function(){
            startEvent('images/town/town.jpg', "images/town/merchant.webp", '"Партнер, ты не пожалеешь! Жди свою долю в следующий раз!"', 0, 0, 0);
            hero.coins-=80;
            eventCount.merchantBuisness++;
            goLocation("town");
        });
        btn2.addEventListener("click", townEvent);
    }else if (eventCount.merchantBuisness == 3){
        startEvent('images/town/town.jpg',"images/town/merchant.webp", '"О, а вот и ты! Твоя доля от нашего небольшого бизнеса - 20 монет!"',0,20,0);
        eventCount.merchantBuisness++;
        btnCreate("Отлично!", "","","");
        btnShow()
        btn1.addEventListener("click", townEvent);
    }else if (eventCount.merchantBuisness == 4){
        startEvent('images/town/town.jpg',"images/town/merchant.webp", 'А вот и очередные 20 монет! Дело идет в гору! Кстати, у меня для тебя подарок - зелье скорости. Сможешь бить врагов еще быстрее!',0,20,0);
        hero.speed-=200;
        eventCount.merchantBuisness++;
        btnCreate("Я быстрый!", "","","");
        btnShow()
        btn1.addEventListener("click", townEvent);
    }else if (eventCount.merchantBuisness == 5) {
        startEvent('images/town/town.jpg', "images/town/merchant.webp", 'Вот и твоя доля! Дружище, остался последний рывок. Моими товарами заинтересовался сам мер, а это сулит очень крупные сделки... Не хватает всего 200 монет', 0, 20, 0);
        btnCreate("<img src='images/icons/coins.png'/>-200", "Пройти мимо", "", "");
        btnShow()
        btn1.disabled = ggBeggar(hero.coins, 200)
        btn1.addEventListener("click", function () {
            startEvent('images/town/town.jpg', "images/town/merchant.webp", '"Мы будем богаты, друг мой..."', 0, 0, 0);
            hero.coins -= 200;
            eventCount.merchantBuisness++;
            goLocation("town");
        });
        btn2.addEventListener("click", townEvent);
    }else if (eventCount.merchantBuisness == 6) {
        startEvent('images/town/town.jpg', "images/town/merchant.webp", '"Теперь ты совладелец самой крупной торговой точки в городе! Вложений больше не понадобится, бизнес обеспечивает сам себя. Заходи иногда за своими деньгами и спасибо, друг!"', 0, 40, 0);
        eventCount.merchantBuisness++;
        btnCreate("Я бизнесмен", "", "", "");
        btnShow()
        btn1.addEventListener("click", townEvent)
    }else if (eventCount.merchantBuisness == 7){
        startEvent('images/town/town.jpg', "images/town/merchant.webp", '"Друг мой сердечный! Рад тебя видеть! Вот твои деньги, все как обычно."', 0, 40, 0);
        btnCreate("Отлично!", "", "", "");
        btnShow()
        btn1.addEventListener("click", townEvent)
    }
}


//=====================Чувак===================================
function findDude(){
    let phrase = ['"Вы бы не могли подписать мою петицию?"',
        '"Подпиши эту дурацкую петицию, или это придётся делать выжившим членам твоей семьи!"',
        '"Подпиши эту петицию, или я пойду за тобой до дома и убью твою собаку"',
        '"Послушай, просто подпиши эту дурацкую петицию, времени мало у меня, понимаешь?!"',
        '"Подпиши мою петицию, чёрт возьми!"']

    let phraseRejection = ['"Ууу… Завтра это будет болеть". Чувак больно избивает вас кулаками',
        '"Ты, вероятно, и не думал, что тебе суждено умереть сегодня… Сюрприз!!!". Чувак обливает вас бензином. Спичка. Вжух. И где он достал бензин в средневековье?',
        '"Теперь цветочки будут расти быстрее...". Чтож, это было унизительно.',
        '"Вы, вероятно, думаете, что я не очень хороший человек…". С этими словами чувак кидает в вас затвердевшим грязным носком. Больно.',
        '"Не волнуйся, ты просто уснешь." Чувак прицельно бьет вас лопатой по лицу.',]

    let phraseConsent = ['"ДА, ДЕТКА!!! Я — КОРОЛЬ ЯЩЕРИЦ!!!". Кажется он доволен, уходим.',
        '"Ммм… пахнет цыпленком!". Чувак отвлекся от вас и ушел.',
        '"Блин, это просто праздник какой-то!". Он явно очень рад, отлично. Можно идти дальше',
        '"Кис, кис, коровка, коровка.". Это он вообще про что?',
        '"Это может мне повредить, но я же чувствую себя потрясающе.". Ладно, поверим',
        'Чувак молча, не моргая смотрит на вас. Так, медленно отходим...']

    let petition = ['"Заставить всех играть в жестокие видеоигры"',
        '"За право граждан на неограниченный доступ к оружию"',
        '"За обязательное ношение защитных шлемов в городе"',
        '"В поддержку легализации уличных боёв без правил"',
        '"За отмену закона о запрете на кормление голубей"',
        '"За легализацию охоты на голубей в городской черте"',
        '"За обязательное ношение бронежилетов всеми горожанами"',
        '"Против цензуры в СМИ: дайте людям правду!"',
        '"Против людей, которые собирают петиции"',
        'В этот раз лист пуст. Но пара подписей уже стоит...']

    btnClose()
    startEvent('images/town/town.jpg',"images/town/dude.png", phrase[Math.floor(Math.random()*phrase.length)],0,0,0)
    let rndNum = Math.floor(Math.random()*21)
    console.log(rndNum)
    btnCreate("Согласиться", "Отказаться", "Что в петиции?","");
    btnShow()
    btn1.addEventListener("click", function() {
        startEvent('images/town/town.jpg',"images/town/dude.png", phraseConsent[Math.floor(Math.random()*phraseConsent.length)],0,0,-3)
        goLocation("town");
    })
    btn2.addEventListener("click", function() {
        if (rndNum >= 0 && rndNum <= 14) {
            startEvent('images/town/town.jpg',"images/town/dude.png", phraseRejection[Math.floor(Math.random()*phraseRejection.length)],-20,0,0);
            goLocation("town")
        }else if(rndNum > 14) {
            startEvent('images/town/town.jpg',"images/town/dude.png", 'Чувак резко теряет к вам интерес и идет дальше.',0,0,0);
            goLocation("town")
        }
    })
    btn3.addEventListener("click", function() {
        startEvent('images/town/town.jpg',"images/town/dude.png", petition[Math.floor(Math.random()*petition.length)],0,0,0)
        btn3.disabled = true;
    })

}


//========================Воришка===================================
function findThief(){
    btnClose()
    if (hero.rep<-5){
        startEvent('images/town/town.jpg',"images/town/thief.png", 'В толпе вы видите карманника. Он кивает вам и растворяется в толпе. Кажется, он принял вас за своего.',0,0,0)
        goLocation("town");
    }else if (hero.coins<=5){
        startEvent('images/town/town.jpg',"images/town/thief.png", 'Проходя в толпе, вы задумались. "В кармане совсем пусто... Может стать карманником? Да ну, бред какой-то..."',0,0,0)
        goLocation("town");
    }else{
        btnClose()
        startEvent('images/town/town.jpg',"images/town/thief.png", 'В толпе с вами столкнулся человек. Да он вас обчистил!',0,-8,0);
        let rndNum = Math.floor(Math.random()*22)+hero.agility;
        console.log(rndNum)
        btnCreate("Погнаться", "Закричать", "","");

        btn1.addEventListener("click", function() {
            btnClose()
            if (rndNum >= 0 && rndNum <= 7) {
                startEvent('images/town/town.jpg',"", 'В глазах темнеет, голова кружится. Вы так и не смогли догнать проворного воришку. Ваши монеты утеряны навсегда. Да и в боку сильно колет',-10,0,0);
                goLocation("town")
            }else if(rndNum > 7 && rndNum <= 14) {
                findBoss('"Хорошо, ты догнал меня. Что дальше? Твое золото я все равно не отдам!"', robber,'images/town/town.jpg')
            }else if(rndNum > 14) {
                startEvent('images/town/town.jpg',"images/town/thief2.webp", 'Вы знаете эти улицы как свои пять пальцев! Легко настигнув вора вы забираете свои деньги и забираете часть его монет, за моральный ущерб',0,10,3);
                goLocation("town")
            }
        });
        btn2.addEventListener("click", function() {
            if(rndNum > 14 || hero.rep>15) {
                startEvent('images/town/town.jpg', "images/town/thief2.webp", 'Вы громко кричите: "Держи вора!". К вашему счатстью, в толпе был ваш хороший знакомый, который кинулся вам на помощь. Вместе вы валите карманника на землю и выхватываете свой кошель', 0, 8, 3);
                goLocation("town")
            }else if(rndNum > 7 && rndNum <= 14) {
                startEvent('images/town/town.jpg',"", 'К сожалению, всем плевать на ваши крики. Воришка быстро растворился в толпе',0,0,0);
                goLocation("town")
            }else if(rndNum >= 0 && rndNum <= 7) {
                startEvent('images/town/town.jpg',"images/town/guard.webp", '"Чего разорался! Хватит смущать народ, иди отсюда подобру-поздорову". Стражник не поверил вашей истории.',0,0,-5);
                goLocation("town")
            }
        });
        btnShow()
    }
}
//Раненый воришка
function woundedThief(){
    btnClose()
    startEvent('images/town/town.jpg',"images/town/thief2.webp", 'В одном из закоулков вы находите воришку. Он ранен и явно напуган. "Не говори страже что я здесь! Я не хочу опять в тюрьму!"',0,0,0);
    let rndNum = Math.floor(Math.random()*21)
    console.log(rndNum)
    btnCreate("Отвести к доктору", "Сообщить страже", "Добить","");

    btn1.addEventListener("click", function() {
        btnClose()
        if (rndNum >= 0 && rndNum <= 7) {
            startEvent('images/town/town.jpg',"images/town/guard.webp", 'Вас замечают стражники. У них конец смены и им сильно плевать на то, что вы лишь помогали преступнику. Вы в тюрьме за соучастие.',0,0,0);
            loopCount = 0;
            goLocation("prison")
        }else if(rndNum > 7 && rndNum <= 14) {
            startEvent('images/town/town.jpg',"images/healer.png", 'Вы доводите воришку до доктора. "А, опять ты, пройдоха? Опять поцапался со стражей?". Вернувшись в город вы замечаете пропажу монет. Ну а чего вы ожидали от вора?',0,-10,5);
            goLocation("town")
        }else if(rndNum > 14 && rndNum < 21) {
            startEvent('images/town/town.jpg',"images/town/thief.png", 'Вы доводите воришку до доктора. "Спасибо, век не забуду. Нельзя мне в тюрьму, у меня дочь. Вот держи и еще раз спасибо". Вор протягивает вам кошель с золотом',0,8,5);
            goLocation("town")
        }
    });
    btn2.addEventListener("click", function() {
        if (hero.rep<0){
            startEvent('images/town/town.jpg',"images/town/guard.webp", 'Внимательно вас выслушав, стражник громко заржал: "Решил сдать подельника? Ты вероятно очень тупой. Мы тебя самого по всему городу ищем!". Вас отправляют в тюрьму.',0,0,0);
            loopCount = 0;
            goLocation("prison")
            return
        }

        if (rndNum > 0 && rndNum <= 7) {
            startEvent('images/town/town.jpg',"images/town/thief.png", 'Вы не успеваете обратиться к стражникам. С криками "мочи крысу" вас хорошенько отделывают и забирают часть монет',-40,-10,0);
            goLocation("town")
        }else if(rndNum > 7 && rndNum <= 14) {
            findBoss('"Лучше смерть! Мерзавец, ты пожалеешь!"', robber, 'images/town/town.jpg');
        }else if(rndNum > 14 && rndNum < 21) {
            startEvent('images/town/town.jpg',"images/town/guard.webp", 'Вы передаете воришку в руки страже. Один из стражников передает вам горсть монет за содействие',0,5,5);
            goLocation("town")
        }
    });
    btn3.addEventListener("click", function() {
        findBoss('"Мерзавец, готовься к смерти!"', robber, 'images/town/town.jpg');
    });
    btnShow()
}




//===========================Бродяга===============================
//=КМБ
function findKMB(){
    btnClose()
    startEvent('images/town/town.jpg', 'images/town/NoName.png', 'На улице сидит попрошайка. Он играет в камень/ножницы/бумага со всеми желающими. Размеется, не просто так. Ставка 1 монета',0,0,0)
    let rndNum = Math.floor(Math.random()*3)
    btnCreate("Камень", "Ножницы", "Бумага", "Далее");
    btn1.disabled = ggBeggar(hero.coins,1);
    btn2.disabled = ggBeggar(hero.coins,1);
    btn3.disabled = ggBeggar(hero.coins,1);
    btn1.addEventListener("click", function() {
        btnClose()
        if (rndNum==0){
            hero.coins++
            document.getElementById("text").innerText = '"И правда, камень" - попрошайка явно удивлен. "Чтож, забирай свой выигрыш" +1 монета.';
        }else{
            hero.coins--
            document.getElementById("text").innerText = '"Повезет в другой раз!" - попрошайка подмигнул и забрал монету со стола. -1 монета'
        }
        goLocation("town")
    });
    btn2.addEventListener("click", function() {
        btnClose()
        if (rndNum==1){
            hero.coins++
            document.getElementById("text").innerText = '"И правда, ножницы" - попрошайка явно удивлен. "Чтож, забирай свой выигрыш" +1 монета.';
        }else{
            hero.coins--
            document.getElementById("text").innerText = '"Повезет в другой раз!" - попрошайка подмигнул и забрал монету со стола. -1 монета'
        }
        goLocation("town")
    });
    btn3.addEventListener("click", function() {
        btnClose()
        if (rndNum==2){
            hero.coins++
            document.getElementById("text").innerText = '"И правда, бумага" - попрошайка явно удивлен. "Чтож, забирай свой выигрыш" +1 монета.';
        }else{
            hero.coins--
            document.getElementById("text").innerText = '"Повезет в другой раз!" - попрошайка подмигнул и забрал монету со стола. -1 монета'
        }
        goLocation("town")
    });
    btn4.addEventListener("click", function() {
        townEvent()
    });
    btnShow()
    rewriteStats()
}
//=Кошель
function findTresure(){
    btnClose()
    startEvent('images/town/town.jpg',"images/town/coinsTree.png", 'Вы нашли кошель с золотом. Что будем делать?',0,0,0);
    let rndNum = Math.floor(Math.random()*22)
    console.log(rndNum)
    btnCreate("Забрать", "Оглядеться", "","");
    btnShow()
    btn1.addEventListener("click", function() {
        btnClose()
        if (rndNum >= 0 && rndNum <= 7) {
            startEvent('images/town/town.jpg',"images/town/NoName.png", 'Из толпы появляется местный бродяга. "Эй ты! Да ты! А ну не трожь это мое! Я позову стражу! Страаажаааааа! Помогите, грабят!". Правильно говорила мама, не трожь чужое. К вам подходит стражник',0,0,0);
            btnCreate("Далее","","","")
            btnShow()
            btn1.addEventListener("click", function() {
                criminalScum()
            })
        }else if(rndNum > 7 && rndNum <= 14) {
            findBoss('Из толпы появляется местный бродяга. "Решил прикарманить мое золото? Большая ошибка". Бродяга настроен решительно.', strider,'images/town/town.jpg')
        }else if(rndNum > 14) {
            startEvent('images/town/town.jpg',"images/town/coinsTree.png", 'Вы забираете золото себе! +5 монет',0,5,0);
            goLocation("town")
        }
    });
    btn2.addEventListener("click", function() {
        if (rndNum >= 0 && rndNum <= 7) {
            startEvent('images/town/town.jpg',"images/town/thief.png", 'В толпе вы видите человека, который растеряно хлопает по карманам. Вы возвращаете золото. "Дай-ка я пересчитаю свое золотишко. 7-8-9... Да тут не хватает!" Вы нехотя отдаете монеты. Вас явно развели',0,-10,0);
            goLocation("town")
        }else if(rndNum > 7 && rndNum <= 14) {
            startEvent('images/town/town.jpg',"images/town/NoName.png", 'В толпе вы видите мужчину, который растеряно хлопает по карманам. Вы возвращаете золото. "Спасибо тебе! Я всем расскажу о твоем благородном поступке!"',0,0,3);
            goLocation("town")
        }else if(rndNum > 14 && rndNum < 22) {
            startEvent('images/town/town.jpg',"images/town/guard.webp", 'В толпе вы видите стражника, который растеряно хлопает по карманам. Вы возвращаете золото. "У тебя доброе сердце. Не давай себя в обиду. Знаешь, я считаю что в нашем мире, добро должно быть с кулаками." Мужчина показывает вам несколько полезных приемов. Урон увеличен.',0,0,0);
            hero.dmg = Math.floor(hero.dmg*1.1*10)/10
            goLocation("town")
        }
    });
}

function findBeggar(){
    btnClose()
    startEvent('images/town/town.jpg',"images/town/NoName.png", 'Вы встретили бродягу. Он явно нетрезв. "Я дича-а-а-а-айше извиняюсь...  Уважаемый... ух. Не найдется монеты, для страждущей души?"',0,0,0);
    btnCreate("Дать монету", "Пройти мимо", "","");
    btnShow()
    btn1.addEventListener("click", function() {
        if (hero.coins<=3){
            let rndNum = Math.floor(Math.random()*22)
            if (rndNum < 11){
                startEvent('images/town/town.jpg',"images/town/NoName.png", '"Аахахахах... Ой не могу, ик! Не позорься, убирай свои копейки...". Вас обсмеял нищий. ',0,0,-2);
            }else{
                startEvent('images/town/town.jpg',"images/town/NoName.png", 'Бродяга видит ваш пустой кошель. "Так, уважаемый... я смотрю ты сам не богат. Мне даже совестно у тебя что-то просить. На вот монету, вспоминай меня добрым словом" ',0,1,0);
            }
            btnClose()
            btnCreate("Далее","","","")
            btnShow()
            btn1.addEventListener("click", townEvent)
            return
        }
        let rndNum = Math.floor(Math.random()*22)+hero.attention;
        if (rndNum >= 0 && rndNum <= 14) {
            startEvent('images/town/town.jpg',"images/town/NoName.png", '"Ик! О-о-о, мое уважение, долгих лет..." Бродяга быстро уходит. Проверив карманы вы поняли, что бродяга стащил у вас пару монет',0,-2,0);
            goLocation("town")
        }else if(rndNum > 14) {
            startEvent('images/town/town.jpg',"images/town/NoName.png",'"Ик! О-о-о, мое уважение, долгих лет жизни, счастья, здоровья..." Бродяга рассыпается в благодарнастях. -1 монета +1 репутация',0,-1,2);
            goLocation("town")
        }
    })
    btn2.addEventListener("click", function() {
        let rndNum = Math.floor(Math.random()*22)
        if (rndNum >= 0 && rndNum <= 7) {
            startEvent('images/town/town.jpg',"images/town/NoName.png", '"Буэээ... Что, жалко монеты для нуждающегося? Мужики, гаси его!". Из подворотни выбегаеют еще несколько бродяг. Вам ничего не остается, кроме как отдать все деньги',0,hero.coins*(-1),-2);
            goLocation("town")
        }else if(rndNum > 7 && rndNum <= 14) {
            findBoss('"Жадность не доведет тебя до добра" Бродяга достает нож', strider, 'images/town/town.jpg')
        }else if(rndNum > 14) {
            startEvent('images/town/town.jpg',"images/town/NoName.png", '"На нет и суда нет..."',0,0,0);
            goLocation("town")
        }
    })
}

function fireBeggar(){
    btnClose()
    startEvent('images/town/town.jpg',"images/town/NoName.png", 'В одном из темных закоулков вы замечаете мерцание. У костра сидит бродяга и что-то бормочет себе под нос',0,0,0);
    btnCreate("Подойти", "Пройти мимо", "","");
    btnShow()
    btn1.addEventListener("click", function() {
        btnClose()
        startEvent('images/town/town.jpg', "images/town/NoName.png", 'Заметив вас бродяга медленно поднимается. Красные глаза, изо рта капает пена. "Буэээауе?"', 0, 0, 0);
        btnCreate("Да", "Нет", "Напасть", "");
        btnShow()
        btn1.addEventListener("click", function () {
            let rndNum = Math.floor(Math.random() * 21)
            if (rndNum >= 0 && rndNum <= 7) {
                findBoss('Не отводя от вас взгляд, Бродяга достает дубину. Кажется, ему не понравился ответ.', strider, 'images/town/town.jpg')
            } else if (rndNum > 7 && rndNum <= 14) {
                startEvent('images/town/town.jpg', "images/town/NoName.png", 'Бродяга кивает и теряет к вам интерес', 0, 0, 0);
                goLocation("town")
            } else if (rndNum > 14 && rndNum < 22) {
                if (rndNum % 0 == 0) {
                    startEvent('images/town/town.jpg', "images/town/NoName.png", '"Буэээауе!" Бродяга хлопает вас по плечу. Кажется, вы угадали с ответом. Репутация повышена', 0, 0, 10);
                    goLocation("town");
                } else {
                    startEvent('images/town/town.jpg', "images/town/NoName.png", '"Буэээауе..." Бродяга улыбнулся и даже прослезился. Он передает вам сверток - это деньги', 0, 10, 0);
                    goLocation("town");
                }
            }
        });
        btn2.addEventListener("click", function () {
            rndNum = Math.floor(Math.random() * 21)
            if (rndNum >= 0 && rndNum <= 7) {
                findBoss('Не отводя от вас взгляд, Бродяга достает дубину. Кажется, ему не понравился ответ.', strider, 'images/town/town.jpg')
            } else if (rndNum > 7 && rndNum <= 14) {
                startEvent('images/town/town.jpg', "images/town/NoName.png", 'Бродяга кивает и теряет к вам интерес', 0, 0, 0);
                goLocation("town")
            } else if (rndNum > 14 && rndNum < 22) {
                if (rndNum % 0 == 0) {
                    startEvent('images/town/town.jpg', "images/town/NoName.png", '"Буэээауе!" Бродяга хлопает вас по плечу. Кажется, вы угадали с ответом. Репутация повышена', 0, 0, 10);
                    goLocation("town");
                } else {
                    startEvent('images/town/town.jpg', "images/town/NoName.png", '"Буэээауе..." Бродяга улыбнулся и даже прослезился. Он передает вам сверток - это деньги', 0, 10, 0);
                    goLocation("town");
                }
            }
        });
        btn3.addEventListener("click", function () {
            findBoss('Видя как вы тянетесь за оружием, бродяга оскалился. Он достает дубину и с диким ревом бросается на вас', strider, 'images/town/town.jpg')
        })
    });
    btn2.addEventListener("click", townEvent)
}





// =========================Бабушка=======================
//=Подвал
function findBasement(){
    btnClose()
    if (hero.rep>=0){
        startEvent('images/town/town.jpg',"images/town/granny.webp", 'О, авантюрист! Ты тот кто мне нужен. Из моего подвала доносятся какие-то странные звуки, всю ночь не могла уснуть. Не мог бы ты посмотреть, что там происходит?',0,0,0)
    }else if(hero.rep<0){
        startEvent('images/town/town.jpg',"images/town/granny.webp", '"Опять ты, злодей? Проходи, не задерживайся! Хотя... В мой подвал кто-то забрался, сделай хоть раз доброе дело, проверь что там."',0,0,0)
    }
    btnCreate("Проверить", "Идти дальше", "","");
    btn1.addEventListener("click", function() {
        btnClose()
        findBoss("В подвале вы находите огромного паука, размером с собаку!",spider,"images/town/town.jpg")
    });
    btn2.addEventListener("click", function() {
        townEvent()
    });
    btnShow()
}
//=Мини-кликер "Древесина"
function woodClicker(){
    if (eventCount.angryGranny>=10){
        eventCount.angryGranny=0;
        findBoss('"Ты слишком часто отказывал мне... Пришло время поплатиться" Бабка заливается жутким смехом',evilGranny,"images/town/town.jpg")
        return;
    }
    eventCount.needWood = Math.floor(Math.random()*30);
    btnClose()
    startEvent('images/town/town.jpg',"images/town/granny.webp", '"Эй, мил человек! Помоги старушке, наколи дров. Плачу 3 монеты"',0,0,0);
    if (hero.rep<0) {
        startEvent('images/town/town.jpg', "images/town/granny.webp", '"Чего смотришь? Мимо проходи, не стой над душой. Ну и молодежь нынче...". До это бабули явно дошли слухи о ваших поступках...', 0, 0, 0)
        goLocation("town");
        return
    }
    btnCreate("Помочь", "Отказаться", "","");
    btnShow()
    btn1.addEventListener("click", function() {
        document.getElementById("text").innerText = "Дров "+eventCount.clickWood+" из "+(eventCount.needWood);btnClose()
        btnCreate("Рубить","","","")
        btnShow()
        btn1.addEventListener("click", function() {
            if (eventCount.clickWood <= eventCount.needWood){
                document.getElementById("text").innerText = "Дров "+eventCount.clickWood+" из "+(eventCount.needWood+1);
                eventCount.clickWood++
            }else{
                startEvent('images/town/town.jpg',"images/town/granny.webp", '"Ну спасибо, помог бабушке. Это тебе, ни в чем себе не отказывай". Вы получаете горсть монет и безмерную благодарность бабушки.',0,3,2)
                eventCount.clickWood=0;
                rewriteStats()
                goLocation("town")
            }
        })
    })
    btn2.addEventListener("click",function() {
        eventCount.angryGranny++;
        startEvent('images/town/town.jpg',"images/town/granny.webp", '"Иди-иди, коль совести нет. Эх, ну и молодежь нынче."',0,0,0)
        goLocation("town")
    });
}

// =======================Стражник=======================
function findGuard(){
    btnClose()
    if (hero.rep<0){
        criminalScum()
        return
    }
    let rndNum = Math.floor(Math.random()*22)+hero.attention
    startEvent('images/town/town.jpg',"images/town/guard.webp", 'Вас останавливает стражник. "Гражданин! Мы разыскиваем карманника и ты подходишь под описание. Карманы к досмотру!"',0,0,0)
    btnCreate("Согласиться", "Сопротивляться", "", "");
    btn1.addEventListener("click", function() {
        if (rndNum >= 0 && rndNum <= 7) {
            startEvent('images/town/town.jpg',"", 'Стражник роется в ваших вещах, выбрасывает вашу сумку на землю и уходит. Проверив свои пожитки вы поняли, что вас обокрали',0,-5,0);
            goLocation("town")
        }else if(rndNum > 7 && rndNum <= 14) {
            findBoss('Пока стражник осматривает ваши вещи, вы внимательно к нему присматриваитесь. Шлем явно не по размеру... Вместо меча - воровской кинжал... Клеймо на шее! Да это переодетый бандит!', robber, "images/town/town.jpg");
        }else if(rndNum > 14) {
            startEvent('images/town/town.jpg',"images/town/guard.webp", '"Вроде все чисто... Спасибо за сотрудничество, гражданин!". Стражник уходит по своим делам',0,0,5);
            goLocation("town")
        }
    });
    btn2.addEventListener("click", function() {
        if (rndNum >= 0 && rndNum <= 14){
            hero.rep -= 30;
            findBoss('"Преступное отродье! Готовься к смерти!"',guard,"images/town/town.jpg")
        }else if(rndNum > 14 && rndNum <= 21){
            findBoss('Стражник скидывает шлем. "Как они  в этом ходят... Гони монеты, лопушок, коли жизнь дорога!"',robber,"images/town/town.jpg")
        }
    });
    btnShow()
}

function criminalScum(){
    btnClose()
    if (hero.rep>10){
        startEvent('images/town/town.jpg',"images/town/guard.webp", '"Эх... Да как же тебя угораздило так вляпаться? Ладно, я тебя отмажу, но это в последний раз!"',0,0,0);
        goLocation("town")
        return
    }else if (hero.rep>=0){
        fine=10
    }else if (hero.rep<0){
        fine = hero.rep*(-10);
    }

    startEvent('images/town/town.jpg',"images/town/guard.webp", '"Стоять, преступное отродье! Я не позволю нарушать закон в мою смену! Оплачивай штраф или сгниешь в тюрьме!"',0,0,0);
    btnCreate("В тюрьму",'Штраф -' + fine + '<img src="images/icons/coins.png">',"Сопротивляться","");
    btn2.disabled = ggBeggar(hero.coins,fine)
    btnShow()

    btn1.addEventListener("click", prisonEvent)
    btn2.addEventListener("click", function() {
        startEvent('images/town/town.jpg',"images/town/guard.webp", '"Тебе повезло, что казна остро нуждается в деньгах... Ступай, но помни: в следующий раз я сгною тебя в тюрьме!"',0,fine*(-1),hero.rep*(-1));
        goLocation("town");
    });
    btn3.addEventListener("click", function() {
        findBoss("Преступно отродье! Готовься к встрече с праотцами!",guard,"images/town/town.jpg")
    })
}

function indulgence(){
    btnClose()
    startEvent('images/town/town.jpg',"images/town/guard.webp", '"Слушайте все! Граждане воры, бандиты, алкоголики и тунеядцы! Мэр объявляет помилование всем, кто сознается в преступлениях прямо сейчас! Подходите, не стесняйтесь!"',0,0,0);
    let rndNum = Math.floor(Math.random()*21)
    console.log(rndNum)
    btnCreate("Сдаться", "Идти дальше", "","");
    if (hero.rep>=0){
        btn1.disabled=true;
        btn1.innerText = "Ваша репутация чиста";
    }else{
        btn1.disabled=false;
    }
    btnShow()
    btn1.addEventListener("click", function() {
        if (rndNum >= 0 && rndNum <= 7) {
            startEvent('images/town/town.jpg',"images/town/guard.webp", 'Вы бежите к стражнику, готовясь раскаяться во всех грехах. Скоро ваша репутация будет чиста, как у младенца! "Еще один недоумок повелся! Так, этого в лес, пусть выживает там"',0,0,0);
            goLocation("forest")
        }else if(rndNum > 7 && rndNum <= 14) {
            startEvent('images/town/town.jpg',"images/town/guard.webp", 'Вы бежите к стражнику, готовясь раскаяться во всех грехах. Скоро ваша репутация будет чиста, как у младенца! "Еще один недоумок повелся! Так, этого в тюрьму, нам план выполнять надо"',0,0,0);
            goLocation("prison")
        }else if(rndNum > 14 && rndNum < 22) {
            startEvent('images/town/town.jpg',"images/town/guard.webp", 'Вы бежите к стражнику, готовясь раскаяться во всех грехах. Скоро ваша репутация будет чиста, как у младенца! "А, пройдоха, сегодня твой день! Поздравляю, теперь ты законопослушный гражданин!"',0,0,0);
            hero.rep = 10;
            goLocation("town")
        }
    })
    btn2.addEventListener("click", townEvent)
}

// =========================== Арена ставка =====================
function makeBet(){
    btnClose()
    document.getElementById("text").innerText = "Ставка: "+depositArena;
    btnCreate("Добавить", "Убавить", "Готово","");
    if (depositArena<5) {btn2.disabled = true;}
    btnShow()

    btn1.addEventListener("click", function(){
        hero.coins -= 5
        depositArena += 5;
        document.getElementById("text").innerText = "Ставка: "+depositArena;
        if (depositArena>0){ btn2.disabled = false; }
        rewriteStats()
        btn1.disabled = ggBeggar(hero.coins,5);
    });
    btn2.addEventListener("click", function(){
        if (depositArena<5){
            btn2.disabled = true;
        }else{
            hero.coins += 5;
            depositArena -= 5;
        }
        document.getElementById("text").innerText = "Ставка: "+depositArena;
        rewriteStats();
        btn1.disabled = ggBeggar(hero.coins,5);
        if (depositArena==0){btn2.disabled = true;}
    });
    btn3.addEventListener("click", function(){
        btnClose();
        btnCreate("Далее", "", "","");
        btnShow()
        let rndNum = Math.random()
        if (rndNum < 0.5){
            document.getElementById("text").innerText = "К сожалению, вы проиграли";
        }else{
            document.getElementById("text").innerText = "Оооо да! Сегодня определенно ваш день! Ваш выйгрыш: "+depositArena*2;
            hero.coins += depositArena*2;
        }
        depositArena = 0;
        btn1.addEventListener("click", townEvent);
    })

}

function findArenaBet(){
    btnClose()
    let rndNum = Math.floor(Math.random()*22)
    startEvent("images/town/town.jpg", "images/town/guard.webp", 'Начальник тюрьмы проводит гладиаторские бои на потеху публике. Вы можете поставить на одного из бойцов. Возможно сегодня твой день?',0,0,0)
    btnCreate("Красная", "Синяя", "В другой раз","");
    btn1.disabled = ggBeggar(hero.coins,5);
    btn2.disabled = ggBeggar(hero.coins,5);
    btnShow()
    btn1.addEventListener("click", makeBet)
    btn2.addEventListener("click", makeBet)
    btn3.addEventListener("click", townEvent);
}

// ==========================Странный кот (сфинкс)==============
function findCat(){
    btnClose()
    startEvent('images/town/town.jpg',"images/town/cat.png", 'Словно из ниоткуда перед вами появился странный кот. "Привет, человек" - прозвучал голос в вашей голове - "Мы встретимся трижды. Отгадаешь мои загадки - получишь приз"',0,0,0)
    btnCreate("Согласиться","Далее","","")
    btnShow()
    let riddles = ["Перед ним волы вспахивали белое поле. Он держал белый плуг и сеял черные семена",
        "В мире есть дом: его голос звучит постоянно. Те же, кто в доме живут, всегда молчаливы. И дом и жители в вечном движении",
        "Нет у меня лица, но ничье лицо мне не чуждо. Дивный блеск изнутри ничего не покажет, пока перед собой свет не увидит",
        "У едока ни рта, ни брюха, он ест деревья и зверей. Наевшись досыта, растет. Плесни воды — и ты его убьешь.",
        "Это не увидеть глазами и не потрогать рукаи. Оно наполняет небо и всю землю, сотрясает все основания",
        "Я мягок, как шерсть и трясина, а когда надуваюсь, похож на лягушку. Я погружаюсь в воду и расту."
    ]
    let randRiddle =  Math.floor(Math.random()*riddles.length)
    let questions = [question0, question1, question2, question3, question4, question5];

    btn1.addEventListener("click", function(){
        btnClose()
        startEvent('images/town/town.jpg',"images/town/cat.png", riddles[randRiddle],0,0,0)
        questions[randRiddle]();
    })
    btn2.addEventListener("click", townEvent)
}

function question0(){
    btnCreate("Портной", "Пастух", "Летописец", "")
    btn1.addEventListener("click", wrongAnswer)
    btn2.addEventListener("click", wrongAnswer)
    btn3.addEventListener("click", correctAnswer)
    btnShow()
}

function question1(){
    btnCreate("Нора и кроты", "Улей и пчелы", "Река и рыбы", "")
    btn1.addEventListener("click", wrongAnswer)
    btn2.addEventListener("click", wrongAnswer)
    btn3.addEventListener("click", correctAnswer)
    btnShow()
}

function question2(){
    btnCreate("Маска", "Тень", "Зеркало", "")
    btn1.addEventListener("click", wrongAnswer)
    btn2.addEventListener("click", wrongAnswer)
    btn3.addEventListener("click", correctAnswer)
    btnShow()
}

function question3(){
    btnCreate("Засухы", "Огонь", "Пропасть", "")
    btn1.addEventListener("click", wrongAnswer)
    btn2.addEventListener("click", correctAnswer)
    btn3.addEventListener("click", wrongAnswer)
    btnShow()
}

function question4(){
    btnCreate("Ветер", "Молния", "Дерево", "")
    btn1.addEventListener("click", correctAnswer)
    btn2.addEventListener("click", wrongAnswer)
    btn3.addEventListener("click", wrongAnswer)
    btnShow()
}

function question5(){
    btnCreate("Губка", "Рыба", "Водросли", "")
    btn1.addEventListener("click", correctAnswer)
    btn2.addEventListener("click", wrongAnswer)
    btn3.addEventListener("click", wrongAnswer)
    btnShow()
}

function wrongAnswer(){
    btnClose()
    startEvent('images/town/town.jpg',"images/town/cat.png", '"Не верно. Не отчаивайся, думаю мы встретимся еще...". Кот растворился в воздухе',0,0,0)
    rewriteStats()
    btnCreate("Далее","","","")
    btn1.addEventListener("click", townEvent);
    btnShow()
}

function correctAnswer() {
    btnClose();
    eventCount.correctAnswers++
    if (eventCount.correctAnswers == 3) {
        startEvent('images/town/town.jpg', "images/town/cat.png", '"Ты ответил верно на 3 вопроса. Как я и обещал, получай награду"', 0, 5, 3)
        rewriteStats()
        eventCount.correctAnswers = 0
    } else {
        startEvent('images/town/town.jpg', "images/town/cat.png", '"Верно" - промурчал кот. Верных ответов ' + eventCount.correctAnswers + ' из 3. Еще увидимся"', 0, 0, 0)
    }
    btnCreate("Далее", "", "", "")
    btn1.addEventListener("click", townEvent);
    btnShow()
}


























