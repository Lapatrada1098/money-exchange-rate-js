const currency_one = document.getElementById('currency-one'); 
const currency_two = document.getElementById('currency-two'); 
const amount_one = document.getElementById('amount-one');
const amount_two = document.getElementById('amount-two');
const rateText= document.getElementById('rate'); //อ้างอิง api มาไว้ที่ rateText แล้วใส่ไปใน rate ที่เป้นการแสดงอัตราแลกเปลี่ยนสกุลเงิน
const swap = document.getElementById('btn'); //สลับสกุลเงิน

currency_one.addEventListener('change',calculateMoney);
currency_two.addEventListener('change',calculateMoney); //เหตุการณ์เมื่อมีการเปลี่ยนตัวเลือกใน dropdownlist จะเรียนใช้ฟังก์ชั่น calcuteMoney
//syntax change=เหตุการ์ณ , calculateMoney = function ที่จะดำเนินการเมื่อเกิด event ที่กำหนด
amount_one.addEventListener('input',calculateMoney);
amount_one.addEventListener('input',calculateMoney);

function calculateMoney(){
    const one = currency_one.value; //เป็นการนำสกุลเงินจาก currency_one เก็บไว้ที่ตัวแปร one เช่น console.log("สกุลเงินต้นทาง =",one) => สกุลเงินต้นทาง = SGD
    const two = currency_two.value;
    fetch(`https://api.exchangerate.host/latest/?base=${one}`)
    .then(res=>res.json()).then(data=>{
        const rate = data.rates[two];
        rateText.innerText = `1 ${one} = ${rate} ${two}`;
        amount_two.value=(amount_one.value*rate).toFixed(2) // ใส่ .value เพราะต้องการค่าเป็นตัวเลข
    })
}

swap.addEventListener('click',()=>{
    // เมื่อมีการคลิกที่ปุ่ม swap จะให้ทำอะไร => สร้างเป็นฟังก์ชั่นขึ้นมา โดยไม่มีการรับค่าข้างใน 
    //USD => THB || THB => USB
    // TEMP => USD || THE = TEMP(USD)
    const temp = currency_one.value;  // จะดึงค่า  currency_one.value มาเก็บไว้ ในตัวแปร temp
    currency_one.value = currency_two.value; // แล้วทำการสลับค่าระหว่าง currency_one.value และ currency_two.value โดยกำหนดให้ค่า currency_one.value = currency_two.value
    currency_two.value = temp; // แล้ว ค่า  currency_two.value จะเท่ากับ ค่า currency_one.value ที่ถูกเก็บไว้ในตัวแปร temp
    calculateMoney();
})

calculateMoney();

