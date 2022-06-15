import React, {useState, useEffect} from "react"
import { Text, View, StyleSheet, TouchableOpacity, StatusBar, TextInput, ScrollView, FlatList  } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from 'react-native-safe-area-context'
import axios from "axios"
import { AntDesign } from '@expo/vector-icons';
import uuid from 'react-native-uuid'

const App=()=>{

  const [todo, setTodo]=useState("")
  const [todos, setTodos]=useState([])

  //const [edit, setEdit] = useState(false)
  const [editText, setEditText] = useState("")


  
//fetching
  useEffect(()=>{
    async function getAllInfo(){
    try {
      const server = await axios.get("http://10.0.2.2:5000/gettodo") //for android emulator ip will be 10.0.2.2
      console.log(server.data)
      setTodos(server.data)
    } catch (error) {
      console.log(error)
    }
    }
    getAllInfo()
  }, [])

//adding todo
  const addTodo=()=>{
    var uid=uuid.v4()
    if (!todo) return
    
    else{axios.post('http://10.0.2.2:5000/create',
    { 
      id:uid,
      info:todo 
    }).then(()=>{
      setTodos([...todos,{id:uid, info:todo
    }])
  })
    setTodo("")}
}

//edit todo

const edittodo=(id)=>{
  //  if(!edit){
  //  setEdit(!edit)}
  // else{
  axios.put('http://10.0.2.2:5000/updatetodo',{info:editText,id:id}).then(
    (res)=>{
    setTodos(
      todos.map((item)=>{
      return item.id===id? {
        id:item.id, 
        info:editText
        }
         : item
      })
      )})
      //document.getElementById("id1").value = "";
    }


      // const updateEmpName=(id)=>{
      //   Axios.put('https://crud-352905.de.r.appspot.com/updatenam',{emp_name:newName,id:id}).then(
      //     (res)=>{
      //     setemp_list(
      //       emp_list.map((val)=>{
      //       return val.id==id? {
      //         id:val.id, 
      //         emp_name:newName,
      //         emp_age:val.emp_age,
      //         emp_position:val.emp_position,
      //         emp_salary:val.emp_salary
      //         }
      //          : val
      //       })
      //     )
      //   }
      // )
      // document.getElementById("id5").value = "";
      // }


// const edittodo=()=>{
//     if (!edit){
//      setEdit(!edit)
// }}



//deletetodo
const deletetodo=(id)=>{
  axios.delete(`http://10.0.2.2:5000/delete/${id}`)
  .then((res)=>{
  setTodos(todos.filter((item)=>item.id!=id))
  })}

return(
  <View style={style.container}>
  <Text style={style.heading}>Todo-list App</Text>
  <View style={style.inpcont}>
  <TextInput value={todo} onChangeText={(text)=>setTodo(text)} placeholder ="Enter a todo" style={style.input}/>
  </View>

  <TouchableOpacity style={style.button} onPress={addTodo}>
  <Text style={style.buttontxt}>Save It!!</Text>
  </TouchableOpacity>


  <View style={{ width: "100%", marginTop: 10 }}>
    
  <FlatList 
  keyExtractor={(item)=>item.id}
  data={todos}
  renderItem={({item})=> (
  <View style={style.todo}>

  <Text style={style.txt}>{item.info}, {item.id}</Text>
  <TextInput style={style.inp} id="id1" onChangeText={(text)=>setEditText(text)}/>
  <TouchableOpacity>
  <AntDesign style={style.icon} name="edit" size={24} color="black" onPress={()=>edittodo(item.id)}/>
  </TouchableOpacity>
  <TouchableOpacity> 
  <AntDesign name="delete" size={24} color="black" onPress={()=>deletetodo(item.id)}/>
  </TouchableOpacity>
  </View>
  )}/> 
  
{/* <ScrollView keyboardShouldPersistTaps>
   {todos.map((item)=>(
  <View style={style.todo}>
  <TouchableOpacity>
  <AntDesign style={style.action} name="edit" size={24} color="black" onPress={()=>{}} />
  </TouchableOpacity>
  {!edit?<Text style={style.txt}>{item.info}, {item.id}</Text>:<TextInput style={style.inp} value={editText} onChangeText={(text)=>setEditText(text)}/>}
  <TouchableOpacity> 
  <AntDesign name="checkcircle" size={24} color="black"/>
  </TouchableOpacity>
  <TouchableOpacity> 
  <AntDesign style={style.icon} name="delete" size={24} color="black" onPress={()=>deletetodo(item.id)}/>
  </TouchableOpacity>
  </View>
   ))}
</ScrollView> */}



  
</View>
  <StatusBar style="auto"/>
  </View>
)}

export default App
const style=StyleSheet.create({
  container:{
    flex:1,
    alignItems:"center",
    backgroundColor:"yellow",
  },
  heading:{
    marginTop:50,
    marginVertical:5,
    fontSize:30,
    fontWeight: "bold",
    textDecorationLine: 'underline',
  },
  inpcont:{
    flexDirection: "row",
    alignItems:"center",
    marginHorizontal:20,
  },
  input:{
    flex:1,
    marginTop: 50,
    fontSize:20,
    backgroundColor:"white",
    paddingHorizontal:20 ,
    paddingVertical:20 ,
    borderRadius:50,
    shadowColor:"black",
    elevation:13,
  },
  button:{
    marginTop: 40,
    paddingHorizontal:20 ,
    paddingVertical:20 ,
    borderRadius:50,
    backgroundColor:"black"
    
  },
  buttontxt:{
    fontSize:20,
    color:"white"
  },
  small:{
    
    marginVertical: 20,
    fontSize:20,
    fontWeight: "bold",

  },
  todo: {
    flexDirection: "row",
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: "black",
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 50,
  },
txt:{
    flex: 1,
    fontSize: 18,
    paddingVertical: 3,
    paddingHorizontal: 5,
},
inp:{
    flex:1,
    fontSize:18,
    borderColor:"grey",
    borderRadius:50,
    borderWidth:1,
},
icon:{
  paddingLeft:10,
  paddingRight:10

}

})
