const categoryButtons = document.querySelectorAll('.category-btn');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const submenu = button.nextElementSibling;
       
        
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
        
        
        categoryButtons.forEach(btn => btn.classList.remove('selected'));
        
        
        button.classList.add('selected');
    });
});

const subButtons = document.querySelectorAll('.sub-btn');
const docContent = document.getElementById('doc-content');
let currentStyle = null;  

subButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        const category = button.closest('.category').querySelector('.category-btn').getAttribute('data-category');
        
        
        const docType = button.getAttribute('data-doc');
        
       
        fetch(`tutoriais/${category}/${docType}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Erro ao carregar o tutorial.');
                }
                return response.text();
            })
            .then(data => {
                
                docContent.innerHTML = data;

                
                if (currentStyle) {
                    currentStyle.remove();
                }

               
                const styleLink = document.createElement('link');
                styleLink.rel = 'stylesheet';
                styleLink.href = `tutoriais/${category}/${docType}.css`;
                document.head.appendChild(styleLink);

               
                currentStyle = styleLink;
            })
            .catch(error => {
                docContent.innerHTML = `<p>${error.message}</p>`;
            });
    });
});
