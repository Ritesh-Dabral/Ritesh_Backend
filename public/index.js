function validate(){
        // vaidate values
    var height = document.getElementById('height').value;
    var coeff = document.getElementById('coeff').value;    
    var message = document.getElementById('message');
    var result = document.getElementById('result');
    if(isNaN(height)||isNaN(coeff)){
        height.value = '';
        coeff.value = '';
        message.innerHTML = '<strong>Please Enter only Numeric Values</strong>';
        return false;
    }
    if(coeff<0 || coeff>=1)
    {
        height.value = '';
        coeff.value = '';
        message.innerHTML = '<strong>Coefficient: [0,1)</strong>';
        return false; 
    }
    return true;
}