// --- 3D Background with Three.js ---
const initThreeJS = () => {
    const canvas = document.querySelector('#bg-canvas');
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true, antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000; // Efficient count
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
        // Spread particles across a wide area
        posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    // Material
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.02,
        color: 0x7000ff, // Primary purple
        transparent: true,
        opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;

    // Animate
    const animate = () => {
        requestAnimationFrame(animate);

        // Rotation
        particlesMesh.rotation.y += 0.001;
        particlesMesh.rotation.x += 0.0005;

        // Subtle Parallax based on mouse (optional/minimal)
        // particlesMesh.rotation.y += mouseX * 0.0001;

        renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
};

// --- Testimonials Data & Injection ---
const testimonials = [
    {
        name: "Ace2k7",
        role: "Content Creator",
        country: "United States",
        text: "Liger Moen absolutely crushed it with my PC optimization! My system is now faster than ever, and I’m experiencing zero lag during gameplay or editing. Top-tier solutions."
    },
    {
        name: "Gamerz Crunch",
        role: "Content Creator",
        country: "India",
        text: "I've been blown away by how much this platform has improved my performance. The optimization features allowed me to stream and edit videos effortlessly."
    },
    {
        name: "Ismail Hossain",
        role: "Graphic Designer",
        country: "Bangladesh",
        text: "This optimizer has made a huge difference, making my Adobe programs run without a glitch even with heavy files. I couldn't ask for a better tool."
    },
    {
        name: "Mehedi Hasan",
        role: "Graphic Designer",
        country: "Pakistan",
        text: "My PC feels incredibly fast now, and even when running multiple design programs at once, it never slows down. Highly recommend for professionals."
    },
    {
        name: "Sanjoy Mallick",
        role: "Digital Marketer",
        country: "India",
        text: "I've been struggling with an annoying Aim Shake issue for ages, but once I used the optimizer, the problem was completely gone!"
    },
    {
        name: "TmBlox",
        role: "Content Creator",
        country: "China",
        text: "I can't believe how much smoother my streaming setup has become! No more buffering or crashes. This optimizer has seriously elevated my content creation."
    },
    {
        name: "Funguy",
        role: "Gamer",
        country: "United States",
        text: "No more lag, no more stuttering everything runs smoothly now, and my viewers have even noticed the improvement. This is a must for gamers!"
    },
    {
        name: "Ismot Ara Rozy",
        role: "Streamer",
        country: "Bangladesh",
        text: "Streaming used to be a nightmare, but after using the optimization tool, my PC is running flawlessly. I can now stream without a single glitch."
    },
    {
        name: "Jordan Lee",
        role: "Video Editor",
        country: "United Kingdom",
        text: "After using this optimizer, the software runs faster than ever. I can now edit without slowdowns or freezing, making my workflow much more efficient."
    }
];

const renderTestimonials = () => {
    const container = document.getElementById('testimonial-container');
    container.innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
            <div class="testimonial-text">"${t.text}"</div>
            <div class="reviewer-info">
                <h4>${t.name}</h4>
                <p>${t.role} (${t.country})</p>
            </div>
        </div>
    `).join('');
};

// --- Animations (GSAP) ---
const initAnimations = () => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Fade In
    gsap.from(".hero-content", {
        duration: 1.5,
        y: 50,
        opacity: 0,
        ease: "power3.out"
    });

    // Sections Titles
    gsap.utils.toArray(".section-title").forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 80%",
            },
            y: 30,
            opacity: 0,
            duration: 1
        });
    });

    // Packages Stagger
    gsap.from(".package-card", {
        scrollTrigger: {
            trigger: ".packages-grid",
            start: "top 75%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2
    });
};

// --- Modal & UI Logic ---
document.addEventListener('DOMContentLoaded', () => {
    initThreeJS();
    renderTestimonials();
    initAnimations();

    // Mobile Menu
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active'); // Optional: transform hamburger
    });

    // Close menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Scroll to Top
    const scrollTopBtn = document.getElementById('scroll-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Testimonial Carousel Buttons (Simple Scroll)
    const tContainer = document.getElementById('testimonial-container');
    document.getElementById('next-btn').addEventListener('click', () => {
        tContainer.scrollBy({ left: 350, behavior: 'smooth' });
    });
    document.getElementById('prev-btn').addEventListener('click', () => {
        tContainer.scrollBy({ left: -350, behavior: 'smooth' });
    });

    // Payment Modal
    const paymentModal = document.getElementById('payment-modal');
    const closeBtns = document.querySelectorAll('.close-modal');
    const paymentForm = document.getElementById('payment-form');

    window.openModal = (packageName, price) => {
        document.getElementById('modal-package-title').innerText = `Purchase ${packageName}`;
        document.getElementById('selected-package').value = packageName;
        document.getElementById('selected-price').value = price;
        paymentModal.style.display = 'block';
    };

    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            paymentModal.style.display = 'none';
            document.getElementById('thank-you-modal').style.display = 'none';
        });
    });

    window.onclick = (event) => {
        if (event.target == paymentModal) {
            paymentModal.style.display = 'none';
        }
    };

    // Handle Payment Submission
    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Here you would typically send data to backend
        // For now, we simulate success and show Thank You modal
        paymentModal.style.display = 'none';
        document.getElementById('thank-you-modal').style.display = 'block';

        // Optional: clear form
        paymentForm.reset();
    });

    window.closeThankYou = () => {
        document.getElementById('thank-you-modal').style.display = 'none';
    };
});
