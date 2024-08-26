
function selectMood(mood) {
                    
    fetch(`http://localhost:8000/home/${mood}/`, {
        method: 'GET',
    })
    .then(response => {
        if (response.ok) {
            
            window.location.href = 'home.html';
        } else {
            console.error('Error sending mood to backend');
        }
    })
    .catch(error => console.error('Error:', error));
}

function Builder() {
    const options = Object.keys(optionsMapping);
    const table_body = document.getElementById("table-body");

    let idCounter = 0;

    options.forEach(optionKey => {
        const row = document.createElement('tr');
        row.classList.add('table-row');

        const id = document.createElement('div');
        

        const avatar = document.createElement('div');
        avatar.classList.add('avatar');
        const avatar_img = document.createElement('img');
        avatar_img.src = avatarMapping[optionKey];
        avatar.appendChild(avatar_img);

        const img_ava = document.createElement('div');
        img_ava.classList.add('img_ava');
        img_ava.appendChild(id);
        img_ava.appendChild(avatar);

        const dropdown = document.createElement('div');
        dropdown.classList.add('name-dropdown');
        dropdown.style.display = 'none';

        const dropdownOptions = optionsMapping[optionKey] || [];
        dropdownOptions.forEach(optionText => {
            const option = document.createElement('div');
            option.classList.add('dropdown-option');
            option.textContent = optionText;

            const subDropdown = document.createElement('div');
            subDropdown.classList.add('sub-dropdown');
            subDropdown.style.display = 'none';
            
            const subOptions = subOptionsMapping[optionText] || [];
            subOptions.forEach(subOptionText => {
                const subOption = document.createElement('div');
                subOption.classList.add('sub-dropdown-option');
                subOption.textContent = subOptionText;
                subDropdown.appendChild(subOption);    
        
                subOption.addEventListener('click', () => {
                    console.log(`Selected option: ${subOptionText}`);
                    button.textContent = subOptionText;
                    selectMood(subOptionText);
                });
                
                
            });
            

            option.addEventListener('mouseenter', () => {
                subDropdown.style.display = 'block';
            });

            option.addEventListener('mouseleave', () => {
                subDropdown.style.display = 'none';
            });

            
            option.appendChild(subDropdown);
            dropdown.appendChild(option);
        });

        const nameContainer = document.createElement('div');
        nameContainer.classList.add('name-container');
        
        const button = document.createElement('button');
        button.textContent = "Select Mood";
        button.classList.add('mood-button');
        button.addEventListener('click', () => {
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        });

        nameContainer.appendChild(button);
        nameContainer.appendChild(dropdown);

        row.appendChild(img_ava);
        row.appendChild(nameContainer);

        table_body.appendChild(row);
    });
}

const primaryOptionsMapping = {
    0: "HAPPY",
    1: "SAD",
    2: "SURPRISE",
    3: "FEAR",
    4: "ANGER",
    5: "DISGUST"
};
const optionsMapping = {
    "HAPPY": ["JOYFUL", "INTERESTED", "PROUD", "INTIMATE", "OPTIMISTIC", "ACCEPTED"],
    "SAD": ["GUILTY", "ABANDONED", "DESPAIR", "DEPRESSED", "LONELY", "BORED"],
    "SURPRISE": ["STARTLED", "CONFUSED", "AMAZED", "EXCITED"],
    "FEAR": ["SCARED", "ANXIOUS", "INSECURE", "SUBMISSIVE", "HUMILIATED", "REJECTED"],
    "ANGER": ["HATEFUL", "MAD", "AGGRESSIVE", "FRUSTRATED", "THREATENED", "CRITICAL"],
    "DISGUST": ["DISAPPROVAL", "DISAPPOINTED", "AWFUL", "AVOIDANCE"]
};
const subOptionsMapping = {
    "JOYFUL": ["AMAZED", "INQUISITIVE"],
    "INTERESTED": ["LIBERATED", "ECSTATIC"],
    "PROUD": ["CONFIDENT", "IMPORTANT"],
    "INTIMATE": ["PLAYFUL", "SENSITIVE"],
    "OPTIMISTIC": ["INSPIRED", "OPEN"],
    "ACCEPTED": ["FULFILLED", "RESPECTED"],
    "GUILTY": ["ASHAMED", "REMORSEFUL"],
    "ABANDONED": ["IGNORED", "VICTIMIZED"],
    "DESPAIR": ["VULNERABLE", "POWERLESS"],
    "DESPRESSED": ["INFERIOR", "EMPTY"],
    "LONELY": ["ABANDONED", "ISOLATED"],
    "BORED": ["APATHETIC", "INDIFFERENT"],
    "STARTLED": ["SHOCKED", "DISMAYED"],
    "CONFUSED": ["DILLUSIONED", "PERPLEXED"],
    "AMAZED": ["ASTONISHED", "AWE"],
    "EXCITED": ["EAGER", "ENERGETIC"],
    "SCARED": ["FRIGHTENED", "TERRIFIED"],
    "ANXIOUS": ["WORRIED", "OVERWHELMED"],
    "INSECURE": ["INFERIOR", "INADEQUATE"],
    "SUBMISSIVE": ["INSIGNIFICANT", "WORTHLESS"],
    "HUMILIATED": ["RIDICULED", "DISRESPECTED"],
    "REJECTED": ["ALIENATED", "INADEQUATE"],
    "HATEFUL": ["VIOLATED", "RESENTFUL"],
    "MAD": ["FURIOUS", "ENRAGED"],
    "AGGRESSIVE": ["PROVOKED", "HOSTILE"],
    "FRUSTRATED": ["IRRITATED", "INFURIATED"],
    "THREATENED": ["INSECURE", "JEALOUS"],
    "CRITICAL": ["SARCASTIC", "SKEPTICAL"],
    "DISAPPROVAL": ["JUDGEMENTAL", "LOATHING"],
    "DISAPPOINTED": ["REPUGNANT", "REVOLTED"],
    "AWFUL": ["DETESTABLE", "REVULSION"],
    "AVOIDANCE": ["AVERSION", "HESITANT"]
};
const avatarMapping = {
    "HAPPY": "https://www.pngarts.com/files/4/Happy-Emoji-PNG-High-Quality-Image.png",
    "SAD": "https://cdn.shopify.com/s/files/1/1061/1924/files/Sad_Face_Emoji.png?9898922749706957214",
    "SURPRISE": "https://th.bing.com/th/id/R.0333d577accee4da7c01aa6a4812f941?rik=Nii5JOyQjX5sUw&riu=http%3a%2f%2fcdn.shopify.com%2fs%2ffiles%2f1%2f1061%2f1924%2fproducts%2fEmoji_Icon_Surprised_with_teeth_grande.png%3fv%3d1571606093&ehk=APYM%2b%2f3i3CZCkjcIkXmhx0z3k%2f7ChjqJnBTmbKmk%2fTs%3d&risl=&pid=ImgRaw&r=0",
    "FEAR": "https://emojings.com/wp-content/uploads/2020/03/Fearful-Face-5.png",
    "ANGER": "https://th.bing.com/th/id/OIP.gCTkiSOlJbz3aNwvKe-mywHaHk?rs=1&pid=ImgDetMain",
    "DISGUST": "https://cdn2.iconfinder.com/data/icons/emoticons-flat-1/512/Disgusted_emoji_emoticon-512.png"
};

Builder();
