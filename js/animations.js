class ClickAnimation {
    constructor () {
        // Elementi koje treba animirati.
        this.items = document.querySelectorAll(".click-animation");

        // Bind-ovanje funkcija...
        this.onClick = this.onClick.bind(this);
        this.circleAnimation = this.circleAnimation.bind(this);
        this.fadeAnimation = this.fadeAnimation.bind(this);
        this.getScaleVal = this.getScaleVal.bind(this);

        // Pomocne promenljive.
        //  Krug koji postavljam.
        this.circle = undefined;
        //  Element u koji postavljam krug.
        this.circleParent = undefined;
        //  X i Y koordinate elementa.
        this.elementX;
        this.elementY;
        //  X i Y koordinate klika.
        this.clickX;
        this.clickY;

        this.addEventListeners();
    }
    // Dodajem click event listener na svaki 
    // element za koji zelim da ima animaciju.
    addEventListeners () {
        this.items.forEach(item => {
            item.addEventListener("click", this.onClick);
        });
    }
    // Izvadi decimalnu vrednost transform: scale()-a,
    // jer ne umem da se snadjem sa regexom...
    getScaleVal (str) {
        const niz = [];
        for(let char of str) {
            if((char >= '0' && char <='9') || char === '.')
                niz.push(char);
        }
        return Number(niz.join(""));
    }
    // Obradjuje click, postavlja krug.
    onClick (event) {
        // Pravim krug, dajem mu class i postavljam
        // css koji cu animirati.
        const newCircle = document.createElement("div");
        newCircle.classList.add("click-circle");
        newCircle.style.transform = "scale(0)";
        newCircle.style.opacity = "0.1";

        // Odredjujem koordinate na koje cu ga postaviti.
        const rect = event.target.getBoundingClientRect();
        this.elementX = rect.left;
        this.elementY = rect.top;
        this.clickX = event.clientX;
        this.clickY = event.clientY;

        newCircle.style.top =  `${ this.clickY - this.elementY - 150}px`;
        newCircle.style.left = `${ this.clickX - this.elementX - 150}px`;

        // Dodajem krug na kliknut element.
        event.target.appendChild(newCircle);

        // Pamtim krug kao element, kao i njegovog 'roditelja'.
        this.circle = document.querySelector(".click-circle");
        this.circleParent = event.target;

        // Krece animacija.
        requestAnimationFrame(this.circleAnimation);
    }
    // Cricle-Expand animacija.
    circleAnimation () {
        // Brzina promene scale-a.
        const speed = 0.05;
        const scale = this.getScaleVal(this.circle.style.transform);

        // Krug dostigao max velicinu, krece fade.
        if(scale === 1) {
            requestAnimationFrame(this.fadeAnimation);
            return;
        }

        this.circle.style.transform = `scale(${scale + speed})`;

        requestAnimationFrame(this.circleAnimation);
    }
    // Fade animacija.
    fadeAnimation () {
        // Brzina promene opacity-a.
        const speed = 0.01;
        const opacity = Number(this.circle.style.opacity);

        // Opacity = 0, animacija gotova.
        if(opacity === 0) {
            this.circleParent.removeChild(this.circle);
            return;
        }

        this.circle.style.opacity = `${opacity - speed}`;

        requestAnimationFrame(this.fadeAnimation);
    }
}
new ClickAnimation();
