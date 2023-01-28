
export const fetchRooms = async() =>{
    try{
        const response = await fetch('http://192.168.0.18:3000/getAllRooms');
        // console.log(json);
        const json = await response.json();
        return json.rooms;

    }
    catch(error){
        console.error(error)
    }
}


export const sendInfo = async(info) =>{
    try{
    const response = await fetch('http://192.168.0.18:3000/sendDeviceInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(info)
    });
        return await response.text();
    }
    catch (error) {
        console.error(error);
    }

}

export const fetchDevices = async() =>{
    try{
        const response = await fetch('http://192.168.0.18:3000/getAllDevices');
        const json = await response.json();
        return json.devices;
    }
    catch(error){
        console.error(error)
    }
}
