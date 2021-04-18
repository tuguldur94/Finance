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
        } 
    }
})();

// App холбогч контроллер
var appController = (function (uniCont, finCont) {
    var ctrlAddItem = function(){
        // 1. Оруулах өгөгдлийг дэлгэцээс авна.
        console.log(uniController.getInput())
        // 2. Олж авсан өгөгдлүүдээ санхүүгийн контроллерт дамжуулж тэндээ хадгална.
        // 3. Олж авсан өгөгдлүүдээ веб дээрээ тохирох хэсэгт нь гаргана.
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