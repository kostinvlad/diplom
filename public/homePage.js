'use strict'

const logoutButton = new LogoutButton();

logoutButton.action = () => {
    ApiConnector.logout(
        function(responseBody){           
            if(responseBody.success){
                location.reload();
            }
        }
    );     
}

ApiConnector.current( 
    function(responseBody){    
        if(responseBody.success){
            ProfileWidget.showProfile(responseBody.data)
        }
    }
);

const ratesBoard = new RatesBoard();

function rateRequest(){
    ApiConnector.getStocks(
        function(responseBody){
            if(responseBody.success){
                ratesBoard.clearTable()
                ratesBoard.fillTable(responseBody.data)
            };            
        }
    );
};
rateRequest();
setInterval(rateRequest, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = data => {
    ApiConnector.addMoney(data, 
        function(responseBody){
            if(responseBody.success){
                ProfileWidget.showProfile(responseBody.data)            
                moneyManager.setMessage(null, 'Баланс успешно пополнен')
            }
            else {
                moneyManager.setMessage('Ошибка:', responseBody.data)
            }
        })
};

moneyManager.conversionMoneyCallback = data => {    
    ApiConnector.convertMoney(data, 
        function(responseBody){
            if(responseBody.success){
                ProfileWidget.showProfile(responseBody.data)            
                moneyManager.setMessage(null, 'Валюта конвертирована')
            }
            else {
                moneyManager.setMessage('Ошибка:', responseBody.data)
            }
        })
};

moneyManager.sendMoneyCallback = data => {    
    ApiConnector.transferMoney(data, 
        function(responseBody){
            if(responseBody.success){
                ProfileWidget.showProfile(responseBody.data)            
                moneyManager.setMessage(null, 'Валюта переведена')
            }
            else {
                moneyManager.setMessage('Ошибка:', responseBody.data)
            }
        })
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites(
    function(responseBody){
        if(responseBody.success){
            favoritesWidget.clearTable()
            favoritesWidget.fillTable(responseBody.data)
            moneyManager.updateUsersList(responseBody.data)
        };            
    }
);

favoritesWidget.addUserCallback = data => {    
    ApiConnector.addUserToFavorites(data,
        function(responseBody){            
            if(responseBody.success){
                favoritesWidget.clearTable()
                favoritesWidget.fillTable(responseBody.data)
                moneyManager.updateUsersList(responseBody.data)                
                favoritesWidget.setMessage(null, 'Пользователь добавлен')
            }
            else {
                favoritesWidget.setMessage('Ошибка:', responseBody.data)
            }
        }
    )
}

favoritesWidget.removeUserCallback = data => {
    ApiConnector.removeUserFromFavorites(data, 
        function(responseBody){        
            if(responseBody.success){
                favoritesWidget.clearTable()
                favoritesWidget.fillTable(responseBody.data)
                moneyManager.updateUsersList(responseBody.data)                
                favoritesWidget.setMessage(null, 'Пользователь удалён')
            }
            else {
                favoritesWidget.setMessage('Ошибка:', responseBody.data)
            }
        }
    );
}







