var app = angular.module('myCalcApp', []);
app.controller('myCalcController', ['$scope', function(scope) {
    scope.firstName = "John";
    scope.lastName = "Doe";

    /*
    Code Added from here
    */

   var mySum=0;
   var noOFdecimalplaces=4;
   var cc=[];
   var Xcos=[];var Xsin=[];
   var Xph=[];var Xmag=[];
   var n,m,N;
   //,Xsin[],Xph[],Xmag[];

   var myErrMsgFact;
   var buffer=0;
   var display ,b;
   var mirrorDisplay;   // for evaluation purposes
   stdDevFlag=0;
   avgFlag=0; // 1 when Avg() key clicked
   sigmaFlag=0;// 1 when sigma button clicked
   dftFlag=0; // 1 when DFT key is clicked
   sqrootFlag=0; // 1 when square root key clicked
   
   var sqrFlag      =0; // 1 indicates Square button pressed
   var degrFlag =0;     // 1 degrees mode
   var InverseFlag =0; // 1 Indicates inverse mode
   var factFlag     =0; // 1 Indicates factorial key is pressed


   scope.isRadian = true;
   scope.shriGanesh = function () 
   {
   myErrMsgFact      = 'Factorial is defined for positive integers only !';
   display           = document.getElementById("myDisplay");
   scope.displayText = '=>';
       
   mirrorDisplay ='';
   scope.dft = [];
   scope.myTrigFlag=0;
   scope.today = new Date();


   //qq=document.getElementById('Deg');
   //d=document.getElementById('Deg').innerHTML;	  
   //alert(' d= '+ d );   
   
   /*if (d=='Degrees'){ 
                       //document.getElementById('Deg').innerHTML='Radians';
                       qq.style.backgroundColor="yellow" ;
                       myMess.style.backgroundColor="yellow";
                   }
       else { //document.getElementById('Deg').innerHTML='Degrees';
           qq.style.backgroundColor="red";
           myMess.style.backgroundColor="red";
           }
    */

   Math.sind=function(x){return Math.sin((x*Math.PI)/180);}						
   Math.cosd=function(x){return Math.cos((x*Math.PI)/180);}						
   Math.tand=function(x){return Math.tan((x*Math.PI)/180);}	
   //document.getElementById('myMess').innerHTML='Angles are in  '+document.getElementById('Deg').innerHTML;						
   }// ENd of ShriGanesh()

   scope.myKeyHandler = function(n)
   {
   
   switch(n){
   case 'StdDev': 
               stdDevFlag=1; // ! is not passed to mirrorDisplay which passed to eval()
               scope.displayText   = scope.displayText + 'StdDev'+'(';
               break
   
   
   
   case 'average': 
               avgFlag=1; // ! is not passed to mirrorDisplay which passed to eval()
               scope.displayText   = scope.displayText + 'Avg'+'(';
               break
   
   
   
   case 'jodi': 
               sigmaFlag=1; // ! is not passed to mirrorDisplay which passed to eval()
               scope.displayText   = scope.displayText + '&#931'+'(';
               break
                   
   
   case 'DFT': 
               dftFlag=1; // ! is not passed to mirrorDisplay which passed to eval()
               scope.displayText   = scope.displayText + n+'(';
               break;
   
   
   case '!': 
               factFlag=1; // ! is not passed to mirrorDisplay which passed to eval()
               scope.displayText   = scope.displayText + n;
               break;
   case 'square' :
               sqrFlag=1;
               scope.displayText   = scope.displayText +'<sup>2</sup>';
               break;
   case 'root' :
               sqrootFlag=1;
               scope.displayText   = scope.displayText +'&#8730'+'(';
               mirrorDisplay=mirrorDisplay + '(' ; 
               break;
       case 'pi'	:
               scope.displayText   = scope.displayText +'&#960';
               mirrorDisplay=mirrorDisplay +'4*Math.atan(1)';
               break;
       // closing bracket is suppressed from calculation
       case ')'    :
                   if (dftFlag==1)      { scope.displayText=scope.displayText + n;break}
                   if (sigmaFlag==1)    { scope.displayText=scope.displayText + n;break}
                   if (avgFlag==1)      { scope.displayText=scope.displayText + n;break}
                   if (stdDevFlag==1)   { scope.displayText=scope.displayText + n;break}
   default:
               scope.displayText=scope.displayText + n;
               mirrorDisplay=mirrorDisplay + n ; 	
   
               }// end of switch case 
   
   
   }//end of function myKeyHandler()


   scope.myTrigHandler = function(x)
   {
       scope.myTrigFlag=1;
       if (x=='sin') 
   { 
       x='sin(';
       scope.displayText=scope.displayText + x;
       if( scope.isRadian === false) 
       
       {
           //document.getElementById('myMess').innerHTML='Angles in degrees';
           mirrorDisplay=mirrorDisplay+'Math.sind(' ; 
       
       }
       else {
               //document.getElementById('myMess').innerHTML='Angles in radians';
               mirrorDisplay=mirrorDisplay+'Math.sin(' ;
               }
       
       }// end of sine 
       
       if (x=='cos') 
   { 
       x='cos(';
       scope.displayText=scope.displayText + x;
       if( scope.isRadian == false) 
       
       {
           //document.getElementById('myMess').innerHTML='Angles in degrees';
           mirrorDisplay=mirrorDisplay+'Math.cosd(' ; 
       
       }
       else {
               //document.getElementById('myMess').innerHTML='Angles in radians';
               mirrorDisplay=mirrorDisplay+'Math.cos(' ;
               }
       
       }// end of cosine
       
       if (x=='tan') 
   { 
       x='tan(';
       scope.displayText=scope.displayText + x;
       if( scope.isRadian === false) 
       
       {
           //document.getElementById('myMess').innerHTML='Angles in degrees';
           mirrorDisplay=mirrorDisplay+'Math.tand(' ; 
       
       }
       else {
              // document.getElementById('myMess').innerHTML='Angles in radians';
               mirrorDisplay=mirrorDisplay+'Math.tan(' ;
               }
       
       }// end of tangent
       
       if (x=='asin') 
   { 
       InverseFlag=1;
       x='asin(';
       scope.displayText=scope.displayText + x;
       /*if( document.getElementById('Deg').innerHTML=='Degrees') {
           document.getElementById('myMess').innerHTML='Angles in degrees';  
       } else {document.getElementById('myMess').innerHTML='Angles in radians';	}  
       */
       mirrorDisplay=mirrorDisplay+'Math.asin(' ; 
       }// end of asin  (sine-inverse)
       
       if (x=='acos') 
   { 
       InverseFlag=1;
       x='acos(';
       scope.displayText=scope.displayText + x;
       /*if( document.getElementById('Deg').innerHTML=='Degrees') {
           document.getElementById('myMess').innerHTML='Angles in degrees';  
       } else {document.getElementById('myMess').innerHTML='Angles in radians';	}  
       */
       mirrorDisplay=mirrorDisplay+'Math.acos(' ; 
       }// end of acos  (cosine-inverse)
       
       if (x=='atan') 
   { 
       InverseFlag=1;
       x='atan(';
       scope.displayText=scope.displayText + x;
       /*if( document.getElementById('Deg').innerHTML=='Degrees') {
           document.getElementById('myMess').innerHTML='Angles in degrees';  
       } else {document.getElementById('myMess').innerHTML='Angles in radians';	}  
       */
       mirrorDisplay=mirrorDisplay+'Math.atan(' ; 
       }// end of atan (tan-inverse)
   }// End of function myTrighandler(x)
   //================================
   // When = key is clicked
   //================================
   scope.eqKeyClicked = function() //Linked with = button click event
   {
   
   if (stdDevFlag==1)    { myStdDevCalc();return }
   
   if (avgFlag==1)    { myAvgCalc();return }
   if (sigmaFlag==1)    { mySigmaCalc();return }
   if (dftFlag==1)    { myDFTCalc();return }
   
   if (sqrFlag==1)    { mySquareCalc();return }
   
   if(sqrootFlag==1)  { mySqrtCalc();return }
   
   if (factFlag==1)   { myFactCalc();return   } 
   
   if (scope.myTrigFlag==1) { myTrigCalc();return   }
       
   // alert('mirrorDisplay=  '+ mirrorDisplay );
   
   b                 = eval(mirrorDisplay); // <===== Heart of the calculator 
   scope.displayText = scope.displayText+' = '+ b;
   
   }//End of function eqKeyClicked()
   ///*

   function myStdDevCalc(){

                           stdDevFlag=0;
                           mySum=0; myAvg=0; var myVariance=0;var myVariance1=0; var mySigma1=0;var myVariance2=0; var mySigma2=0;
                           //alert('mirrorDisplay=  '+ mirrorDisplay);
                           var myArray=mirrorDisplay.split(',');
                           var Nsamp = myArray.length;
                           //alert('Nsamp=   '+ Nsamp  );
                           for(var ss=0; ss <= (Nsamp-1);ss++)
                           {
                           //alert('myArray=  '+ myArray[ss]);
                               mySum=mySum+eval(myArray[ss]);
                               myAvg=mySum/(myArray.length);
                           }// end of for loop
                           //scope.displayText=scope.displayText+'='+myAvg;
                           
                           for(var ss=0; ss <= (Nsamp-1);ss++){
                                                   myVariance=myVariance+(myArray[ss]-myAvg)*(myArray[ss]-myAvg);
                           }//End of for loop
                           myVariance1=myVariance/((Nsamp)-1);
                           myVariance2=myVariance/((Nsamp));
                           mySigma1=eval(Math.sqrt(myVariance1));
                           mySigma1=mySigma1.toFixed(noOFdecimalplaces);
                           mySigma2=eval(Math.sqrt(myVariance2));
                           mySigma2=mySigma2.toFixed(noOFdecimalplaces);
                           
                           //alert(' mySigma1 '+mySigma1);
                           scope.displayText=scope.displayText+'='+'Sample'+' Sigma= '+mySigma1+'  Population Sigma = '+mySigma2;
                           
                           
                           }//End of function myStdDevCalc()




   function myAvgCalc() {
                           avgFlag=0;
                           mySum=0; myAvg=0;
                           //alert('mirrorDisplay=  '+ mirrorDisplay);
                           var myArray=mirrorDisplay.split(',');
                           var Nsamp = myArray.length;
                           for(var ss=0; ss <= (Nsamp-1);ss++)
                           {
                           // alert('myArray=  '+ myArray[ss]);
                           mySum=mySum+eval(myArray[ss]);
                           myAvg=mySum/(myArray.length);
                           }
                           scope.displayText=scope.displayText+'='+myAvg;
                       }// End of function myAvgCalc()

   //*/





   function mySigmaCalc() {
                           sigmaFlag=0;
                           mySum=0;
                           //alert('mirrorDisplay=  '+ mirrorDisplay);
                           var myArray=mirrorDisplay.split(',');
                           
                           for(var ss=0; ss <= (myArray.length-1);ss++)
                           {
                           // alert('myArray=  '+ myArray[ss]);
                           mySum=mySum+eval(myArray[ss]);
                           
                           }
                           scope.displayText=scope.displayText+'='+mySum;
                       }// End of function mySigmaCalc()


   function myDFTCalc(){
                                               
                       dftFlag=0;	
                       var a = mirrorDisplay ;	     
                       var sampArray =a.split(',');
                       x =sampArray.map(Number);						
                       //alert('Samples are '+x);					
           N = x.length;
   // initialize all dfts to zero   
   for (m=0;m<N;m++)
       {
           Xcos[m]=0;
           Xsin[m]=0;
           Xmag[m]=0;
           Xph[m]=0;
       }// End of first for loop
   
   for (m=0;m<N;m++)
   {
       for (n=0; n<N; n++)
       {
       Xcos[m]=Xcos[m]+x[n]*Math.cos((2*(Math.PI)*m*n)/(N));	  
       Xsin[m]=Xsin[m]-x[n]*Math.sin((2*(Math.PI)*m*n)/(N));
       //minus sign because of exp(-2*pi*m*n /N)=cos(..)-j*sin(..) 
       } // end of inner for loop
       
       Xmag[m]=Math.sqrt(Xcos[m]*Xcos[m]+Xsin[m]*Xsin[m]);
       Xph[m]=Math.atan2(Xsin[m],Xcos[m]);
       Xcos[m]=Xcos[m].toFixed(noOFdecimalplaces);
       Xsin[m]=Xsin[m].toFixed(noOFdecimalplaces);
       cc[m] = 'X['+m+'] = '+Xcos[m]+'+j'+ Xsin[m]+'';
       //cc[m]='&nbsp&nbsp&nbspX['+m+']&nbsp=&nbsp'+Xcos[m]+'+j'+ Xsin[m]+'&nbsp&nbsp&nbsp<br/>';
       
       
       
   } // end of outer for loop
       
       //aa=Xcos.join('    ,    ' );
       //bb=Xsin.join('  j ,    ' );	 
       //myDisplay.innerHTML=myDisplay.innerHTML+' = '+'<br/>'+'Real Part of DFT=  '+aa+'<br/>'+'Imag part of DFT =   '+bb+'j';
       //myDisplay.innerHTML=myDisplay.innerHTML+' = '+'<br/>'+cc;
       scope.displayText = scope.displayText + ' = ';
       scope.dft = cc;
       //scope.displayText = scope.displayText + ' = ' + '\n' + cc;
       }// End of function myDFTCalc()  






   function mySquareCalc(){
                                               
                           sqrFlag=0;				         
                           b = eval(mirrorDisplay*mirrorDisplay); // <===== Heart of the calculator
                           scope.displayText=scope.displayText+' = '+ b;
                           }// End of mySquareCalc()
                           
   function mySqrtCalc(){
                                               
                           sqrootFlag=0;				         
                           //alert('mirroe.Display=  '+ mirrorDisplay)
                           // inside eval() is to get rid of brackets
                           b = eval(Math.sqrt(eval(mirrorDisplay))); // <===== Heart of the calculator
                           scope.displayText=scope.displayText+' = '+ b;
                           }// End of mySqrtCalc()

   function myTrigCalc(){
               if( document.getElementById('Deg').innerHTML=='Degrees') {degrFlag=1;}

               b=eval(mirrorDisplay); // <===== Heart of the calculator  
   
           if ((degrFlag ==1) && (InverseFlag==1) ) { (b=b*(180/Math.PI)); } 
   
           scope.displayText=scope.displayText+' = '+ b;
           degrFlag=0;InverseFlag=0;

   }// End of function myTrigCalc()

   function myFactCalc(){

   if ((mirrorDisplay.indexOf('.') > -1 )||(mirrorDisplay.indexOf('-') > -1))

               { scope.displayText=myErrMsgFact; 
               factFlag=0;
               return;
               }
       else {
           scope.displayText=scope.displayText+' = '+ myFact(mirrorDisplay);
           factFlag = 0;
           return;
           }

   }//End of function myFactCalc()





   function myFact(m){
       if((m==1)||( m==0) ) { return 1;}
   else{return (m*myFact(m-1));}
   } // End of function myFact()


   scope.myAllClear = function()
   {
   scope.shriGanesh();
   //location.reload();
   //scope.displayText='';
   //mirrorDisplay=scope.displayText;
   } // End of function myAllClear()

   scope.myToggleDeg = function()
   {
        scope.isRadian = !scope.isRadian;
        
   } // End of myToggleDeg()

   scope.delKeyClick = function(){
               scope.displayText='This feature is under development. Stay tuned!';
   }// End of function delKeyClick()

   scope.getAns = function() {
    scope.displayText='This feature is under development. Stay tuned!';
   }



}]);