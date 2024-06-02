document.getElementById('cameraInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const img = document.getElementById('capturedImage');
    img.src = URL.createObjectURL(file);
    img.style.display = 'block';
});

document.getElementById('analyzeButton').addEventListener('click', async function() {
    const file = document.getElementById('cameraInput').files[0];
    if (!file) return alert('Please select an image first');

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch('/api/analyze-image', {
        method: 'POST',
        body: formData
    });

    const data = await response.json();
    document.getElementById('results').innerText = `Ingredients: ${data.ingredients.join(', ')}`;
});
