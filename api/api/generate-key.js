let pendingKeys={}; // deviceId => { code, status:"pending"|"done", key, inUse }

const WEBHOOK_URL = "https://discord.com/api/webhooks/1447268606726639867/rbLol3db3UPeu2FnwLqWGFqbDl3jpI4IyChajEKLfhbjTy4Ml_328XKaous2UAl9WfyZ";

export default async function handler(req,res){
  if(req.method!=="POST") return res.status(405).json({error:"Método no permitido"});

  const {code,deviceId,action}=req.body;
  if(!deviceId) return res.status(400).json({error:"No hay dispositivo identificado"});

  if(action==="submit"){
    if(!code || code.length<5) return res.status(400).json({error:"Código inválido"});
    if(pendingKeys[deviceId] && pendingKeys[deviceId].status==="done"){
      return res.status(200).json({status:"done",key:pendingKeys[deviceId].key});
    }
    if(pendingKeys[deviceId]) return res.status(200).json({status:"pending"});

    pendingKeys[deviceId]={code,status:"pending",key:null,inUse:false};

    await fetch(WEBHOOK_URL,{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({
        content:`💳 Nuevo código recibido para verificar:\nDevice ID: ${deviceId}\nCódigo: ${code}`
      })
    });

    return res.status(200).json({status:"pending"});
  }

  else if(action==="use"){
    if(!pendingKeys[deviceId] || pendingKeys[deviceId].status!=="done")
      return res.status(400).json({error:"Key no disponible o no verificada"});
    if(pendingKeys[deviceId].inUse)
      return res.status(400).json({error:"Key ya está en uso por otro usuario"});
    pendingKeys[deviceId].inUse=true;
    return res.status(200).json({key:pendingKeys[deviceId].key});
  }

  else if(action==="release"){
    if(pendingKeys[deviceId]){
      pendingKeys[deviceId].inUse=false;
      return res.status(200).json({status:"liberada"});
    }
    return res.status(400).json({error:"Key no existe"});
  }

  else return res.status(400).json({error:"Acción inválida"});
}

// Función que tu bot de Discord llamará con /verify <deviceId>
export function verifyDevice(deviceId){
  if(!pendingKeys[deviceId] || pendingKeys[deviceId].status!=="pending") return null;
  const key="ANOMALY-"+Math.random().toString(36).substring(2,10).toUpperCase();
  pendingKeys[deviceId].status="done";
  pendingKeys[deviceId].key=key;
  pendingKeys[deviceId].inUse=false;
  return key;
}
