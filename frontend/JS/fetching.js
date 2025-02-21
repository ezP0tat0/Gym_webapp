async function getTickets()
{
    
}
try {
    const data = await getData("Ticket");
    console.log(data);

    for(const e of tickets)
    {
        let imgSrc= await img(e.imgUrl);
        
        
    }
} catch (error) {
    console.log("Adatbekérési hiba: " + error);
    div.textContent = "Hiba történt az adatok lekérdezése során.";
}