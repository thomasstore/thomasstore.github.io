// Utility Functions
        function formatCurrency(amount) {
            return new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0
            }).format(amount);
        }

        function formatPhoneNumber(input) {
            let value = input.value.replace(/\D/g, '');
            if (value.startsWith('0')) {
                if (value.length <= 13) {
                    input.value = value;
                }
            } else if (value.startsWith('62')) {
                value = '0' + value.substring(2);
                if (value.length <= 13) {
                    input.value = value;
                }
            }
        }
        // Enhanced Notification System
        function showNotification(title, message, type = 'success') {
            const notification = document.getElementById('notification');
            const titleEl = document.getElementById('notifTitle');
            const messageEl = document.getElementById('notifMessage');
            const iconEl = document.getElementById('notifIcon');

            titleEl.textContent = title;
            messageEl.textContent = message;

            // Set icon based on type
            const icons = {
                success: '✓',
                warning: '⚠',
                error: '✗',
                info: 'ℹ'
            };
            iconEl.textContent = icons[type] || icons.success;

            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 4000);
        }

        function selectService(service) {
            showNotification('Layanan Dipilih', `Anda memilih layanan ${service}. Fitur akan segera tersedia!`, 'info');
        }

        function addLoadingState(buttonId, loadingText) {
            const button = document.getElementById(buttonId);
            const originalText = button.innerHTML;
            button.innerHTML = loadingText;
            button.disabled = true;
            button.classList.add('loading');
            
            return () => {
                button.innerHTML = originalText;
                button.disabled = false;
                button.classList.remove('loading');
            };
        }

        function sendHostingRequest() {
    const name = document.getElementById('hostingName').value.trim();
    const server = document.getElementById('serverName').value.trim();
    const serverType = document.getElementById('serverType').value;
    const payment = document.getElementById('paymentMethod').value;

    if (!name || !server || !serverType || !payment) {
        showNotification('Data Belum Lengkap', 'Mohon lengkapi semua form terlebih dahulu', 'warning');
        return;
    }

    const message = `Halo Admin 👋\n\nSaya ingin langganan *Hosting / VPS* dengan detail berikut:\n\n👤 Nama: *${name}*\n🖥️ Server: *${server}*\n📦 Jenis: *${serverType}*\n💳 Pembayaran: *${payment}*\n\nMohon informasi lanjut ya 🙏`;

    const waURL = `https://wa.me/6281274945189?text=${encodeURIComponent(message)}`;
    window.open(waURL, '_blank');
}


    function sendToWhatsApp() {
    const name = document.getElementById('customerName').value.trim();
    const packageValue = document.getElementById('botPackage').value;

    if (!name) {
        showNotification('Nama Kosong', 'Mohon isi nama lengkap Anda sebelum melanjutkan', 'warning');
        return;
    }

    if (!packageValue) {
        showNotification('Paket Belum Dipilih', 'Silakan pilih paket bot WhatsApp terlebih dahulu', 'warning');
        return;
    }

    const [packageName, packagePrice] = packageValue.split('|');
    const formattedPrice = formatRupiah(packagePrice);

    const message = `Halo Admin ThomasPay 👋, saya ingin mendaftar *Bot WhatsApp*:\n\n👤 Nama: *${name}*\n📦 Paket: *${capitalize(packageName)}*\n💰 Harga: *${formattedPrice}*\n\nMohon informasi lebih lanjut ya 🙏`;

    const waNumber = '6281274945189';
    const waURL = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
    window.open(waURL, '_blank');
}

        function handlePlatformChange() {
    const type = document.getElementById('platformType').value;
    const options = document.getElementById('platformOptions');
    const container = document.getElementById('platformOptionsContainer');
    const label = document.getElementById('platformOptionsLabel');

    options.innerHTML = '';

    if (type === 'app') {
        label.textContent = 'Jenis Layanan Aplikasi';
        ['Pulsa', 'Data', 'DANA', 'ShopeePay', 'Gopay'].forEach(opt => {
            const option = document.createElement('option');
            option.value = opt;
            option.textContent = opt;
            options.appendChild(option);
        });
    } else if (type === 'web') {
        label.textContent = 'Jenis Website';
        ['Portfolio', 'Landing Page', 'Web Profile', 'Company Profile', 'Storefront'].forEach(opt => {
            const option = document.createElement('option');
            option.value = opt;
            option.textContent = opt;
            options.appendChild(option);
        });
    }

    container.style.display = type ? 'block' : 'none';
}

function sendPlatformToWhatsApp() {
    const platformType = document.getElementById('platformType').value;
    const hero = document.getElementById('heroName').value.trim();
    const nav = document.getElementById('navName').value.trim();
    const selectedOption = document.getElementById('platformOptions').value;

    if (!platformType || !hero || !nav || !selectedOption) {
        showNotification('Lengkapi Form', 'Semua field wajib diisi terlebih dahulu', 'warning');
        return;
    }

    const jenis = platformType === 'app' ? 'Aplikasi' : 'Website';
    const message = `Halo Admin 👋\n\nSaya ingin membuat ${jenis} dengan rincian:\n\n🔥 Hero Title: *${hero}*\n🔗 Nav Name: *${nav}*\n📌 Jenis: *${selectedOption}*\n\nMohon infonya lebih lanjut ya 🙏`;

    const waURL = `https://wa.me/6281274945189?text=${encodeURIComponent(message)}`;
    window.open(waURL, '_blank');
}


function formatRupiah(angka) {
    return 'Rp ' + parseInt(angka).toLocaleString('id-ID');
}


        function updateBalance(amount) {
            const balanceEl = document.getElementById('balance');
            const currentBalance = parseInt(balanceEl.textContent.replace(/\D/g, ''));
            const newBalance = currentBalance + amount;
            balanceEl.textContent = formatCurrency(newBalance);
            
            // Add animation
            balanceEl.style.transform = 'scale(1.05)';
            balanceEl.style.transition = 'transform 0.3s ease';
            setTimeout(() => {
                balanceEl.style.transform = 'scale(1)';
            }, 300);
        }

        function addTransactionToList(transaction) {
            const transactionsList = document.getElementById('transactionsList');
            const transactionEl = document.createElement('div');
            transactionEl.className = 'transaction-item';
            transactionEl.style.opacity = '0';
            transactionEl.style.transform = 'translateY(-20px)';
            
            const iconColors = {
                '📱': 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                '⚡': 'linear-gradient(135deg, #45b7d1, #096dd9)',
                '💳': 'linear-gradient(135deg, #4ecdc4, #44a08d)',
                '💧': 'linear-gradient(135deg, #96ceb4, #3dd5f3)',
                '🏥': 'linear-gradient(135deg, #feca57, #ff9ff3)'
            };
            
            transactionEl.innerHTML = `
                <div class="transaction-icon" style="background: ${iconColors[transaction.icon] || iconColors['💳']};">${transaction.icon}</div>
                <div class="transaction-info">
                    <div class="transaction-title">${transaction.title}</div>
                    <div class="transaction-date">${transaction.date}</div>
                </div>
                <div class="transaction-amount ${transaction.amount >= 0 ? 'amount-positive' : 'amount-negative'}">
                    ${transaction.amount === 0 ? 'Gratis' : formatCurrency(transaction.amount)}
                </div>
            `;
            
            transactionsList.insertBefore(transactionEl, transactionsList.firstChild);
            
            // Animate in
            setTimeout(() => {
                transactionEl.style.transition = 'all 0.5s ease';
                transactionEl.style.opacity = '1';
                transactionEl.style.transform = 'translateY(0)';
            }, 100);
        }

        // Initialize animations on scroll
        function handleScroll() {
            const elements = document.querySelectorAll('.animate-up, .animate-right');
            elements.forEach(el => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight - 100) {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0) translateX(0)';
                }
            });
        }

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('load', handleScroll);

        // Initialize page
        document.addEventListener('DOMContentLoaded', function() {
            // Set initial animation states
            document.querySelectorAll('.animate-up').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(30px)';
                el.style.transition = 'all 0.6s ease';
            });
            
            document.querySelectorAll('.animate-right').forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateX(30px)';
                el.style.transition = 'all 0.6s ease';
            });
            
            // Trigger initial animations
            handleScroll();
            
            // Show welcome message
            setTimeout(() => {
                showNotification('Selamat Datang!', 'Selamat datang di ThomasPay. Nikmati kemudahan bertransaksi digital!', 'info');
            }, 1000);
        });
