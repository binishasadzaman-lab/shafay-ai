import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
const KEY="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";
export default function App(){
const [q,setQ]=useState('');
const [a,setA]=useState('Salam! I am Shafay AI');
const [l,setL]=useState(false);
const send=async()=>{
if(!q)return;
let qq=q; setQ(''); setL(true);
try{
let r=await fetch('https://api.groq.com/openai/v1/chat/completions',{method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+KEY},body:JSON.stringify({model:'llama-3.1-8b-instant',messages:[{role:'user',content:qq}]})});
let d=await r.json();
setA(d.choices[0].message.content);
}catch(e){setA('Error: '+e.message);}
setL(false);
};
return(
<View style={{flex:1,backgroundColor:'#000',paddingTop:60,padding:15}}>
<Text style={{color:'#fff',fontSize:26,fontWeight:'bold',textAlign:'center'}}>Shafay AI</Text>
<ScrollView style={{marginTop:20}}><Text style={{color:'#fff',fontSize:18}}>{l?'Thinking...':a}</Text></ScrollView>
<View style={{flexDirection:'row',marginTop:10}}>
<TextInput value={q} onChangeText={setQ} placeholder="Ask anything" placeholderTextColor="#888" style={{flex:1,backgroundColor:'#222',color:'#fff',padding:12,borderRadius:10}}/>
<TouchableOpacity onPress={send} style={{backgroundColor:'#fff',padding:12,borderRadius:10,marginLeft:8}}><Text>Send</Text></TouchableOpacity>
</View>
</View>
);
}
