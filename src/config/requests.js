
export const sendFile = async (files) => {
    let data = new FormData(); 
    data.append('file', files[0])
     
    console.log(data.get('file'))

    const options = {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/pdf',
            'Origin': 'http://localhost:3000/LoadPage'
        }),
        body: data
    }
    await fetch('http://192.168.88.62:5000/load_file', options)
        .then((json) => json.json()
            .then(js => console.log(js))
        )
        
}