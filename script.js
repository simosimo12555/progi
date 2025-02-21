// تبديل اللغة
document.getElementById('languageToggle').addEventListener('click', function () {
    const arabicElements = document.querySelectorAll('[data-lang="ar"]');
    const englishElements = document.querySelectorAll('[data-lang="en"]');

    arabicElements.forEach(el => el.classList.toggle('d-none'));
    englishElements.forEach(el => el.classList.toggle('d-none'));

    // تغيير نص الزر
    if (this.textContent === 'English') {
        this.textContent = 'العربية';
    } else {
        this.textContent = 'English';
    }
});

// وضع المظلم
document.getElementById('darkModeToggle').addEventListener('click', function () {
    document.body.classList.toggle('dark-mode');
    this.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
});

// حساب السعرات الحرارية
document.getElementById('calorieForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;

    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const dailyCalories = bmr * activity;
    const finalCalories = goal === 'gain' ? dailyCalories + 500 : dailyCalories - 500;

    document.getElementById('caloriesNeeded').textContent = `السعرات الحرارية المطلوبة: ${finalCalories.toFixed(2)}`;
    document.getElementById('result').classList.remove('d-none');

    // اقتراحات الوجبات
    const mealSuggestions = goal === 'gain' ?
        ['وجبة 1: أرز مع دجاج', 'وجبة 2: بيض مع خضار', 'وجبة 3: سمك مع بطاطس'] :
        ['وجبة 1: سلطة مع تونة', 'وجبة 2: شوربة خضار', 'وجبة 3: دجاج مشوي'];

    const mealList = document.getElementById('mealSuggestions');
    mealList.innerHTML = mealSuggestions.map(meal => `<li class="list-group-item">${meal}</li>`).join('');

    // اقتراحات التمارين
    const exerciseSuggestions = goal === 'gain' ?
        ['تمرين 1: رفع أثقال', 'تمرين 2: تمارين مقاومة', 'تمرين 3: تمارين كارديو'] :
        ['تمرين 1: مشي سريع', 'تمرين 2: تمارين هوائية', 'تمرين 3: تمارين مرونة'];

    const exerciseList = document.getElementById('exerciseSuggestions');
    exerciseList.innerHTML = exerciseSuggestions.map(exercise => `<li class="list-group-item">${exercise}</li>`).join('');

    // نصائح
    const tips = goal === 'gain' ?
        ['تناول البروتين بكثرة', 'احرص على الراحة', 'اشرب الماء بانتظام'] :
        ['قلل من السكريات', 'مارس التمارين بانتظام', 'تناول وجبات صغيرة متكررة'];

    const tipsList = document.getElementById('tips');
    tipsList.innerHTML = tips.map(tip => `<li class="list-group-item">${tip}</li>`).join('');
});