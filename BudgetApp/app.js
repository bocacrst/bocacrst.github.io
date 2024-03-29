var budgetController = (function(){
    
    var Expenses = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        this.percentage = -1;
        
    };
    
    Expenses.prototype.calcPercentage = function(totalIncome){
        if(totalIncome > 0)
            this.percentage = Math.round((this.value/totalIncome)* 100);
        else
            this.percentage = -1 ;
    };
    
    Expenses.prototype.getPercentage = function(){
        return this.percentage;
    };
    
     var Income = function(id, description, value){
        this.id = id;
        this.description = description;
        this.value = value;
        
    };
     
     var calculateTotal = function(type){
         var sum = 0;
         data.allitems[type].forEach(function(curent){
             sum += curent.value;
         })
         data.totals[type] = sum;
     };
     
     var data ={
         allitems: {
             exp: [],
             inc: []
         },
         
         totals: {
             exp: 0,
             inc: 0
         
         },
         budget: 0,
         percentage: -1
     };
   
    
    return {
        addItem: function (type,des,val){
            
            var newItem,ID;
            
            if(data.allitems[type].length > 0)
                ID = data.allitems[type][data.allitems[type].length - 1].id + 1;
            else
                ID = 0;
            
            if(type === "exp"){
               newItem = new Expenses(ID,des,val); 
            }else if(type === "inc"){
                newItem = new Income(ID,des,val);   
            }
            
            data.allitems[type].push(newItem);
            return newItem;
        },
        
        deleteItem: function(type, id){
            var ids,index;
            
            ids = data.allitems[type].map(function(current){
                 return current.id;
            });
               
            index = ids.indexOf(id);
            
            if(index !== -1){
                data.allitems[type].splice(index , 1);
            }
        },
        
        calculateBudget: function(){
            //Calculate total income/expenses
            calculateTotal('exp');
            calculateTotal('inc');
            
            //Calculate the budget: inc -exp
            data.budget = data.totals.inc - data.totals.exp;
            //Calculate the percentage of incom spent
            if(data.totals.inc > 0)
                data.percentage = Math.round((data.totals.exp/data.totals.inc) * 100);
            else 
                data.percentage = -1;
            
        },
        
        calculatePercentages: function(){
            
            data.allitems.exp.forEach(function(cur) {
                cur.calcPercentage(data.totals.inc);
                
            })
        },
        
        getPercentages: function(){
            var allPerc;
            
            allPerc = data.allitems.exp.map(function (cur){
                return cur.getPercentage();
            })
            
            return allPerc;
        },
        
        getBudget: function(){
            return{
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
        },
        
        testing: function(){
            console.log(data);
        }
    }
    
})();


//********************************************************************************************
//############################################################################################
//********************************************************************************************


var UIController = (function(){
    
    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputBtn: '.add__btn',
        expensesContainer: '.expenses__list',
        incomeContainer: '.income__list',
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel:'.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container',
        expensesPercLabel:'.item__percentage',
        dateLabel: '.budget__title--month'
          
    };
    
    var formatNumber = function(num , type){
        var numSplit, int, dec;
        
        num = Math.abs(num);
        num = num.toFixed(2);
        
        numSplit = num.split('.');
        int = numSplit[0];
        dec = numSplit[1];
        
        if(int.length > 3 && int.length < 6)
           int = int.substr(0,int.length-3) +','+ int.substr(int.length-3, 3);
        else if (int.length >= 6)
            int = int.substr(0,int.length - 6) +','+ int.substr(int.length - 6,3)+','+ int.substr(int.length- 3, 3);
        
        return (type === 'exp' ? '-':'+') + ' ' + int + '.' + dec;
        
    };
    
    var nodeListForEach = function (list, callback){
        for(var i = 0 ; i < list.length; i++)
            callback(list[i], i);
                          
    };
            
    return {
        getinput: function(){
            return {
             type: document.querySelector(DOMstrings.inputType).value,//inc or exp
             description: document.querySelector(DOMstrings.inputDescription).value,
             value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            }; 
        },
         
        addListItem: function(obj, type) {
            var html, newHtml, element;
            // Create HTML string with placeholder text
            
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            
            // Replace the placeholder text with some actual data
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%',formatNumber( obj.value , type));
            
            // Insert the HTML into the DOM
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },
        
        deleteListItem: function(selectorID){
            var el = document.getElementById(selectorID);
            
            el.parentNode.removeChild(el);
            
        },
        
        clearFields: function(){
            var fields, fieldsArr;
            
            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            
            fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach(function(current, index, array) {
                current.value = "";
            })
            
            fieldsArr[0].focus();
        },
        
        displayBudget: function(obj){
            var type;
            obj.budget >= 0 ? type = 'inc' : type = 'exp';
            
            document.querySelector(DOMstrings.budgetLabel).textContent = formatNumber(obj.budget,type);
            document.querySelector(DOMstrings.incomeLabel).textContent = formatNumber(obj.totalInc,'inc');
            document.querySelector(DOMstrings.expensesLabel).textContent = formatNumber(obj.totalExp, 'exp');
            
            if(obj.percentage > 0)
                 document.querySelector(DOMstrings.percentageLabel).textContent = obj.percentage + '%';
            else
                 document.querySelector(DOMstrings.percentageLabel).textContent = '---';
        },
        
        displayPercentages: function(percentages){
           
            var fields = document.querySelectorAll(DOMstrings.expensesPercLabel);
            
            
            nodeListForEach (fields, function(curr, index){
                if( percentages[index] > 0)
                    curr.textContent = percentages[index] + '%';
                else
                    curr.textContent = '---';
            });
            
        },
        
        displayDate: function(){
            var  date, year, month, months;
            
            months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
            
            date = new Date();
            year = date.getFullYear();
            month = months[date.getMonth()];
            
            document.querySelector(DOMstrings.dateLabel).textContent = month + ' ' + year;
            
            
        },
        
        changeOutlineType: function()
        {
            var fields = document.querySelectorAll(DOMstrings.inputType+','+DOMstrings.inputDescription +','+DOMstrings.inputValue);
            
            nodeListForEach(fields,function(cur){
               
                    cur.classList.toggle('red-focus');
            })
            document.querySelector(DOMstrings.inputBtn).classList.toggle('red');
        },
        
        getDOMstrings: function(){
            return DOMstrings;
    }
    
    };
    
})();



//********************************************************************************************
//############################################################################################
//********************************************************************************************



var controller = (function(budgetCtrl,UICtrl){
    
//************************ EVENT LISTENER **********************************************
    
    var setUpEventlisteners = function(){
        
        var DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem)

        document.addEventListener('keypress', function(event){
            if(event.keyCode === 13 || event.which === 13){
                ctrlAddItem();
            }
        })
        
        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
        document.querySelector(DOM.inputType).addEventListener('change', UICtrl.changeOutlineType);
    }
    
//************************************************************************************  
    var updateBudget = function(){
        //Calculate the budget
        budgetCtrl.calculateBudget();
        
        //Return the budget
        var budget = budgetCtrl.getBudget();
        
        //Display the budget UI
        UICtrl.displayBudget(budget);
        
    };
    
    var updatePercentages = function(){
        //Calculate percentages
        budgetCtrl.calculatePercentages();
        //Read percentages from the budget controllet
        var percentages = budgetCtrl.getPercentages();
        //Update UI with new percentages
        UICtrl.displayPercentages(percentages);
        
        console.log(percentages);
    };
    
    var ctrlAddItem = function(){
        var input, newItem;
        
        //Get the field input data
        input = UICtrl.getinput();
        
        if(input.description !== "" && !isNaN(input.value) && input.value >0){
            //Add the item to the budget controller
            newItem = budgetCtrl.addItem(input.type, input.description, input.value);

            //Add the item to the UI
            UICtrl.addListItem(newItem, input.type);

            //Clear the fields
            UICtrl.clearFields();

            //Calculate & update budget
            updateBudget();
            
            //Calculate & update percentages
            updatePercentages();
        }
        
    };
    
    var ctrlDeleteItem = function(event){
        var itemID,splitID,type,ID;
        
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        
        if (itemID){
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);
            
            //Delete item from the data structure 
            budgetCtrl.deleteItem(type,ID);
            
            //Delete item from the UI
            UICtrl.deleteListItem(itemID);
            
            //Update and show new budget
            updateBudget();
            
            //Calculate & update percentages
            updatePercentages();
        }
    };
    
    return{
        init: function(){
            console.log('Application has started !');
            document.querySelector('.add__type').value = 'inc';
            UICtrl.displayDate();
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setUpEventlisteners();
        }
    }
   
   
})(budgetController,UIController);

controller.init();

