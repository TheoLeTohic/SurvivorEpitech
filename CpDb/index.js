const { getFirestore, doc, setDoc } = require("firebase/firestore");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const env = require('dotenv').config()
const query = require('./query')
const fire = require('./db')
const fs = require('fs');
const { exit } = require('process');

async function doOther(employees, bearer_token) {
    let myArray = [];
    let index = 0;

    for (const element of employees) {
        // if (index === 2) break; // here

        const infos = await query.getEmployee(bearer_token, element.id);
        if (infos !== null) {
            const image = await query.getEmployeeImage(bearer_token, element.id);
            infos.image = await image
            myArray.push(infos);
        }
        index++;
    }

    return myArray;
}

async function creatUser(auth, mdp, email) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, mdp)
        const user = await userCredential.user;
        return await user.uid
    } catch (e) {
        console.error("Error creating user " + e);
        return null
    }
}

async function createValue(db, uid, infos, index, max)  {
    const userRef = await doc(db, "Users", uid);
    try {
        await setDoc(userRef, infos);
        console.log("Document written with ID:"+uid+" index:"+ index+" on " + max);
        return true
    } catch (e) {
        console.error("Error adding document: ", e);
        return false
    }
}

async function Start() {
    const auth = getAuth(fire);
    const db = getFirestore(fire);
    console.log("Start")
    const bearer_token = await query.login(process.env.EMAIL, process.env.PSWD)
    if (await bearer_token == null) {
        console.error("Error login bearer token == null")
        return
    }
    console.log("Login success")
    let employees = await query.employees(await bearer_token)
    if (await employees == null) {
        console.error("Error employees == null")
        return
    }
    console.log("Employees success")
    employees = await doOther(await employees, bearer_token)
    if (employees == null) {
        console.error("Error all employees info == null")
        return
    }
    //fs.readFile('data.json', 'utf8', async (err, employees) => {
        //employees = JSON.parse(employees)
        for (i = 0; i < employees.length; i++) {
            const uuid = await creatUser(auth, 'password', employees[i].email)
            if (uuid != null) {
                await createValue(db, await uuid, employees[i], i, employees.length)
            }
        }
    //})
    console.log("All employees info success")
    //creatUser(employees)
    // const jsonData = JSON.stringify(employees, null, 2);
    // fs.writeFileSync('data.json', jsonData);
}

Start()