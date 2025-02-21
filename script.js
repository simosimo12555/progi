document.getElementById('calorieForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // الحصول على القيم من النموذج
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value);
    const activity = parseFloat(document.getElementById('activity').value);
    const goal = document.getElementById('goal').value;

    // حساب السعرات الحرارية
    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    let caloriesNeeded = Math.round(bmr * activity);

    // تعديل السعرات بناءً على الهدف
    if (goal === 'gain') {
        caloriesNeeded += 500; // زيادة السعرات لزيادة الكتلة العضلية
    } else if (goal === 'lose') {
        caloriesNeeded -= 500; // تقليل السعرات لفقدان الوزن
    }

    // عرض النتيجة
    document.getElementById('caloriesNeeded').innerText = `السعرات الحرارية التي تحتاجها: ${caloriesNeeded} سعرة حرارية في اليوم`;
    document.getElementById('result').classList.remove('d-none');

    // اقتراحات الوجبات
    const mealSuggestions = getMealSuggestions(caloriesNeeded);
    const mealList = document.getElementById('mealSuggestions');
    mealList.innerHTML = '';
    mealSuggestions.forEach(meal => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerText = meal;
        mealList.appendChild(li);
    });

    // اقتراحات التمارين
    const exerciseSuggestions = getExerciseSuggestions(goal);
    const exerciseList = document.getElementById('exerciseSuggestions');
    exerciseList.innerHTML = '';
    exerciseSuggestions.forEach(exercise => {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.innerText = exercise;
        exerciseList.appendChild(li);
    });
});

function getMealSuggestions(calories) {
    if (calories < 1500) {
        return [
            "وجبة الإفطار: شوفان مع حليب خالي الدسم",
            "وجبة الغداء: سلطة خضار مع تونة",
            "وجبة العشاء: شوربة خضار"
        ];
    } else if (calories >= 1500 && calories < 2000) {
        return [
            "وجبة الإفطار: بيض مسلوق مع خبز قمح كامل",
            "وجبة الغداء: صدر دجاج مشوي مع أرز بني",
            "وجبة العشاء: سمك مشوي مع خضار سوتيه"
        ];
    } else {
        return [
            "وجبة الإفطار: عصير أخضر مع توست أفوكادو",
            "وجبة الغداء: لحم مشوي مع بطاطا حلوة",
            "وجبة العشاء: معكرونة قمح كامل مع صلصة طماطم"
        ];
    }
}

function getExerciseSuggestions(goal) {
    if (goal === 'gain') {
        return [
            "تمارين رفع الأثقال (3-4 مرات أسبوعيًا)",
            "تمارين السكوات والضغط",
            "تمارين البنش بريس",
            "تمارين زيادة الكتلة العضلية مثل Deadlifts"
        ];
    } else if (goal === 'lose') {
        return [
            "تمارين الكارديو (ركض، سباحة، قفز بالحبل)",
            "تمارين HIIT (تدريب عالي الكثافة)",
            "تمارين اليوجا لتحسين المرونة",
            "تمارين المشي السريع يوميًا"
        ];
    }
}