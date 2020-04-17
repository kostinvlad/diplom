'use strict'

const userForm = new UserForm();

userForm.loginFormCallback = data => {
    
    ApiConnector.login(data, 
        function(responseBody){        
        if(!responseBody.success){
            userForm.setLoginErrorMessage(responseBody.data)
        }
        else {
            location.reload(); 
        }        
    }
    );
};

userForm.registerFormCallback = data => {
    
    ApiConnector.register(data, 
        function(responseBody){       
        if(!responseBody.success){
            userForm.setRegisterErrorMessage(responseBody.data)
        }
        else {
            alert('Регистрация прошла успешно!')
            location.reload(); 
        }        
    }
    );
};




