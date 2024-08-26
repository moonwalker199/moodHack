async function getData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
        return null; 
    }
}

async function domBuilder() {
    const data = await getData("http://localhost:8000/botresponse/");
    if (!data) {
        console.error('No data available or data is not in expected format');
        return;
    }

    const chat_container = document.getElementById("chat-container");
    if (!chat_container) {
        console.error('Chat container element not found');
        return;
    }
    dataArray = [data['user_message'], data['bot_response'],data['created_at']];

    dataArray.forEach(item => {
        const paragraph = document.createElement('div');
        paragraph.className = 'chat-message'; 

        paragraph.textContent = item.message || 'No message content'; 
        paragraph.style.padding = '10px';
        paragraph.style.margin = '5px 0';
        paragraph.style.backgroundColor = '#f1f1f1'; 
        paragraph.style.borderRadius = '5px';

        chat_container.appendChild(paragraph);

        paragraph.textContent = item
    });
}

domBuilder();

