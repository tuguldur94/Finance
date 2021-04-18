// дэлгэцтэй ажиллах
var uniController = (function () {
    var DOMstrings = {
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
    };
    return {
        getInput : function() {
            return{
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
        },
        getDOMstrings: function(){
            return DOMstrings;
        },
        addListItem : function (item, type){
            // Орлого зарлагын элементийг агуулах HTML - ийг бэлтгэх
            var html, list;
            if (type === "inc"){
                list = '.income__list';
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">$description$</div><div class="right clearfix"><div class="item__value">+ $$value$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div>'
            }else {
                list ='.expenses__list';
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">$description$</div><div class="right clearfix"><div class="item__value">- $$value$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>'
            }
            // Тэр Html дотроо орлого зарлагын утгуудыг REPLACE ашиглаж өөрчилж өгнө
            html = html.replace('%id%', item.id);
            html = html.replace('$description$', item.description);
            html = html.replace('$$value$$', item.value);
            // Бэлтгэсэн HTML ээ DOM руу хийж өгнө.
            document.querySelector(list).insertAdjacentHTML("beforeend",html);
        }
    };
})();

// Санхүүтэй ажиллах
var financeController = (function () {
    var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };
    var Expense = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var data = {
        items : {
            inc : [],
            exp : []
        },
        total : {
            inc : 0,
            exp : 0
        }
    };
    return {
        addItem : function(type, desc, val){
            var item, id;
            if (data.items[type].length === 0) id =1;
            else {
                data.items[type][data.items[type].length - 1].id + 1;
            }
            if (type === "inc"){
                item = new Income(id, desc, val);
            } else {
                item = new Expense(id, desc, val);
            }
            data.items[type].push(item);
            
            return item;
        } 
    };
})();

// App холбогч контроллер
var appController = (function (uniCont, finCont) {
    var ctrlAddItem = function(){
        // 1. Оруулах өгөгдлийг дэлгэцээс авна.
        var input = uniController.getInput();
        console.log(input);
        // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэндээ хадгална.
        var item = financeController.addItem(input.type, input.description, input.value);
        // 3. Олж авсан өгөгдлүүдээ веб дээрээ тохирох хэсэгт нь гаргана.
        uniController.addListItem(item, input.type);
        // 4. Төсөв тооцоолно.
        // 5. Эцсийн үлдэгдэл, тооцоог дэлгэцэнд гаргана.
    }
    var setupEventlisteners = function(){
        var DOM = uniController.getDOMstrings();

        document.querySelector(DOM.addBtn).addEventListener("click",function(){
            ctrlAddItem();
        });
    
        document.addEventListener("keypress", function(event){
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    };

    return {
        init: function(){
            setupEventlisteners();
        }
    };
})(uniController, financeController);

appController.init();