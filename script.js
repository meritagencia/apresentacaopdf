document.addEventListener('DOMContentLoaded', () => {
    const showCover = document.getElementById('showCover');
    const showCourse = document.getElementById('showCourse');
    const showAbout = document.getElementById('showAbout');
    const showModules = document.getElementById('showModules');
    const showBonus = document.getElementById('showBonus');
    const showRiv = document.getElementById('showRiv');
    const showMentor = document.getElementById('showMentor');
    const showInvestment = document.getElementById('showInvestment');
    const showThanks = document.getElementById('showThanks');

    const primaryColorInput = document.getElementById('primaryColor');
    const primaryColorText = document.getElementById('primaryColorText');
    
    let companyLogoBase64 = (typeof defaultLogo !== 'undefined') ? defaultLogo : '';
    let mentorPhotoBase64 = '';

    const companyLogoInput = document.getElementById('companyLogo');
    const mentorPhotoInput = document.getElementById('mentorPhoto');

    const coverTitle = document.getElementById('coverTitle');
    const coverSubtitle = document.getElementById('coverSubtitle');
    const coverDescription = document.getElementById('coverDescription');
    const coverWebsite = document.getElementById('coverWebsite');
    const coverStats = document.getElementById('coverStats');

    const courseCardTitle = document.getElementById('courseCardTitle');
    const courseCardText = document.getElementById('courseCardText');
    const targetListText = document.getElementById('targetListText');

    const aboutUsText = document.getElementById('aboutUsText');
    const stat1Title = document.getElementById('stat1Title');
    const stat1Sub = document.getElementById('stat1Sub');
    const stat2Title = document.getElementById('stat2Title');
    const stat2Sub = document.getElementById('stat2Sub');
    const stat3Title = document.getElementById('stat3Title');
    const stat3Sub = document.getElementById('stat3Sub');

    const bonusTitle = document.getElementById('bonusTitle');
    const col1Title = document.getElementById('col1Title');
    const col1Items = document.getElementById('col1Items');
    const col2Title = document.getElementById('col2Title');
    const col2Items = document.getElementById('col2Items');
    const col3Title = document.getElementById('col3Title');
    const col3Items = document.getElementById('col3Items');

    const rivTitle = document.getElementById('rivTitle');
    const rivRLetter = document.getElementById('rivRLetter');
    const rivRTitle = document.getElementById('rivRTitle');
    const rivRDesc = document.getElementById('rivRDesc');
    const rivILetter = document.getElementById('rivILetter');
    const rivITitle = document.getElementById('rivITitle');
    const rivIDesc = document.getElementById('rivIDesc');
    const rivVLetter = document.getElementById('rivVLetter');
    const rivVTitle = document.getElementById('rivVTitle');
    const rivVDesc = document.getElementById('rivVDesc');

    const mentorName = document.getElementById('mentorName');
    const mentorHandle = document.getElementById('mentorHandle');
    const mentorBio = document.getElementById('mentorBio');

    const invText = document.getElementById('invText');
    const reqText = document.getElementById('reqText');
    const contactText = document.getElementById('contactText');

    const thanksWebsite = document.getElementById('thanksWebsite');
    const thanksFooter = document.getElementById('thanksFooter');

    const presentation = document.getElementById('presentation');

    // Image Uploads
    companyLogoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => { companyLogoBase64 = ev.target.result; renderSlides(); };
            reader.readAsDataURL(file);
        }
    });

    mentorPhotoInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => { mentorPhotoBase64 = ev.target.result; renderSlides(); };
            reader.readAsDataURL(file);
        }
    });

    // Color
    function updateColor(color) {
        document.documentElement.style.setProperty('--primary', color);
        document.documentElement.style.setProperty('--primary-glow', color + '26');
        primaryColorInput.value = color;
        primaryColorText.value = color;
    }

    primaryColorInput.addEventListener('input', (e) => updateColor(e.target.value));
    primaryColorText.addEventListener('input', (e) => {
        if (/^#[0-9A-F]{6}$/i.test(e.target.value)) updateColor(e.target.value);
    });

    // Remove Module
    window.removeModule = function(btn) {
        const item = btn.closest('.module-item');
        if (item) {
            item.remove();
            renderSlides();
        }
    };

    // Add Module
    window.addModule = function () {
        const container = document.getElementById('modulesContainer');
        const count = container.querySelectorAll('.module-item').length + 1;
        const div = document.createElement('div');
        div.className = 'form-group module-item';
        div.style.marginTop = '12px';
        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <label style="margin: 0;">Título do Módulo</label>
                <button type="button" onclick="removeModule(this)" style="background: none; border: none; color: #ff4444; cursor: pointer; font-size: 0.85em; text-decoration: underline; padding: 0;">Remover</button>
            </div>
            <input type="text" class="mod-title" value="MÓDULO 0${count}">
            <label>Subtítulo do Módulo</label>
            <input type="text" class="mod-sub" value="NOVO MÓDULO">
            <label>Tópicos (um por linha)</label>
            <textarea class="mod-topics" rows="3"></textarea>
        `;
        container.appendChild(div);
        div.querySelectorAll('input, textarea').forEach(inp => inp.addEventListener('input', renderSlides));
        renderSlides();
    };

    function fmtList(text, cls) {
        return text.split('\n').filter(i => i.trim()).map(item => `<li class="${cls}">${item}</li>`).join('');
    }

    // ===========================
    // RENDER SLIDES
    // ===========================
    function renderSlides() {
        let html = '';
        const logoHtml = companyLogoBase64
            ? `<img src="${companyLogoBase64}" class="logo-img" />`
            : `<div class="cover-footer-logo">ALTA <span>OFFICE</span></div>`;

        // ——— CAPA ———
        if (showCover.checked) {
            html += `
            <div class="slide slide-cover">
                <div class="deco-corner-tl"></div>
                <div class="deco-corner-br"></div>
                <div class="deco-glow-top"></div>
                <div class="slide-watermark">ALTA OFFICE EDUCAÇÃO</div>
                <div class="slide-content">
                    <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
                        <div class="logo-triangle" style="margin-bottom: 35px;"></div>
                        <div class="cover-subtitle">${coverSubtitle.value}</div>
                        <div class="cover-title">${coverTitle.value.replace(/(\+.*)/, '<span class="text-primary">$1</span>')}</div>
                        <div class="cover-desc">${coverDescription.value}</div>
                        <div class="cover-box">
                            <div class="cover-box-label">Sua transformação profissional começa aqui</div>
                            <div class="cover-website">${coverWebsite.value}</div>
                            <div class="cover-stats">${coverStats.value}</div>
                        </div>
                    </div>
                    <div class="cover-logo-area">${logoHtml}</div>
                </div>
            </div>`;
        }

        // ——— SOBRE O CURSO ———
        if (showCourse && showCourse.checked) {
            html += `
            <div class="slide">
                <div class="slide-content" style="justify-content: center;">
                    <div class="course-title">SOBRE O CURSO</div>
                    <div class="course-card">
                        <div class="course-card-title">${courseCardTitle.value}</div>
                        <div class="course-card-text">${courseCardText.value}</div>
                    </div>
                    
                    <div class="course-title" style="margin-bottom: 20px;">PARA QUEM É ESTE CURSO</div>
                    <ul class="target-list">
                        ${targetListText.value.split('\n').filter(i => i.trim()).map(i => `<li class="target-item">${i}</li>`).join('')}
                    </ul>
                </div>
            </div>`;
        }

        // ——— QUEM SOMOS ———
        if (showAbout.checked) {
            html += `
            <div class="slide">
                <div class="deco-corner-tl"></div>
                <div class="deco-glow-top"></div>
                <div class="slide-watermark">ALTA OFFICE EDUCAÇÃO</div>
                <div class="slide-content">
                    <div class="logo-triangle" style="margin-bottom: 25px;"></div>
                    <div style="position: relative;">
                        <div class="title-outline" style="top: -15px; left: -5px;">QUEM</div>
                        <div class="title-mega" style="position: relative; z-index: 2;">QUEM<br>SOMOS?</div>
                    </div>
                    <div class="about-text">${aboutUsText.value}</div>
                    <div class="stats-row">
                        <div class="stat-card">
                            <div class="stat-value">${stat1Title.value}</div>
                            <div class="stat-label">${stat1Sub.value}</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${stat2Title.value}</div>
                            <div class="stat-label">${stat2Sub.value}</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${stat3Title.value}</div>
                            <div class="stat-label">${stat3Sub.value}</div>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        // ——— MÓDULOS ———
        if (showModules.checked) {
            const modules = document.querySelectorAll('.module-item');
            if (modules.length > 0) {
                let cards = '';
                modules.forEach(mod => {
                    const t = mod.querySelector('.mod-title').value;
                    const s = mod.querySelector('.mod-sub').value;
                    const topicItems = mod.querySelector('.mod-topics').value.split('\n').filter(i => i.trim()).map(i => {
                        const txt = i.trim();
                        if (txt.startsWith('[IA]')) {
                            const cleanText = txt.replace('[IA]', '').trim();
                            return `<li class="ia-item"><span class="ia-badge">[IA]</span><span class="ia-text">${cleanText}</span></li>`;
                        }
                        return `<li>${txt}</li>`;
                    }).join('');
                    
                    cards += `
                    <div class="module-card">
                        <div class="module-number">${t}</div>
                        <div class="module-title">${s}</div>
                        <ul class="module-list">${topicItems}</ul>
                    </div>`;
                });
                html += `
                <div class="slide">
                    <div class="slide-content" style="padding: 60px 45px;">
                        <div class="modules-grid">${cards}</div>
                    </div>
                </div>`;
            }
        }

        // ——— BÔNUS ———
        if (showBonus.checked) {
            html += `
            <div class="slide">
                <div class="deco-corner-tl"></div>
                <div class="deco-glow-top"></div>
                <div class="slide-watermark">BÔNUS EXCLUSIVO</div>
                <div class="slide-content">
                    <div class="logo-triangle" style="margin-bottom: 25px;"></div>
                    <div class="badge" style="margin-bottom: 20px;">BÔNUS</div>
                    <div class="bonus-headline">${bonusTitle.value}</div>
                    <div class="title-sub" style="margin-bottom: 10px; color: #666;">Prompts Prontos para Cada Etapa</div>
                    <div class="bonus-cols">
                        <div class="bonus-col">
                            <div class="bonus-col-head col-color-1">${col1Title.value}</div>
                            <ul class="bonus-col-body">${fmtList(col1Items.value, 'bonus-col-item')}</ul>
                        </div>
                        <div class="bonus-col">
                            <div class="bonus-col-head col-color-2">${col2Title.value}</div>
                            <ul class="bonus-col-body">${fmtList(col2Items.value, 'bonus-col-item')}</ul>
                        </div>
                        <div class="bonus-col">
                            <div class="bonus-col-head col-color-3">${col3Title.value}</div>
                            <ul class="bonus-col-body">${fmtList(col3Items.value, 'bonus-col-item')}</ul>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        // ——— MÉTODO ———
        if (showRiv.checked) {
            html += `
            <div class="slide">
                <div class="deco-corner-tl"></div>
                <div class="deco-glow-top"></div>
                <div class="slide-watermark">METODOLOGIA</div>
                <div class="slide-content">
                    <div class="logo-triangle" style="margin: 0 auto 25px;"></div>
                    <div class="riv-title-wrapper">
                        <div class="riv-outline">${rivTitle.value}</div>
                        <div class="title-mega" style="position: relative; z-index: 1;">MÉTODO</div>
                        <div class="title-mega text-primary" style="position: relative; z-index: 1; margin-bottom: 15px;">${rivTitle.value}</div>
                    </div>
                    <div class="riv-desc">O ${rivTitle.value} é o sistema que estrutura toda a sua estratégia — e que, quando combinado com IA, cria uma máquina de vendas que trabalha por você 24h por dia.</div>
                    <div class="riv-cards">
                        <div class="riv-card">
                            <div class="riv-letter-box">${rivRLetter.value}</div>
                            <div class="riv-card-body">
                                <div class="riv-card-title">${rivRTitle.value}</div>
                                <div class="riv-card-desc">${rivRDesc.value}</div>
                            </div>
                        </div>
                        <div class="riv-card">
                            <div class="riv-letter-box">${rivILetter.value}</div>
                            <div class="riv-card-body">
                                <div class="riv-card-title">${rivITitle.value}</div>
                                <div class="riv-card-desc">${rivIDesc.value}</div>
                            </div>
                        </div>
                        <div class="riv-card">
                            <div class="riv-letter-box">${rivVLetter.value}</div>
                            <div class="riv-card-body">
                                <div class="riv-card-title">${rivVTitle.value}</div>
                                <div class="riv-card-desc">${rivVDesc.value}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        // ——— MENTOR ———
        if (showMentor.checked) {
            const photo = mentorPhotoBase64
                ? `<img src="${mentorPhotoBase64}" />`
                : `<div class="placeholder-text">[Foto]</div>`;
            html += `
            <div class="slide">
                <div class="deco-corner-tl"></div>
                <div class="deco-glow-top"></div>
                <div class="slide-watermark">SEU MENTOR</div>
                <div class="slide-content">
                    <div class="logo-triangle" style="margin: 0 auto 20px;"></div>
                    <div class="title-section accent-underline" style="margin-bottom: 10px;">SEU MENTOR</div>
                    <div class="mentor-layout">
                        <div class="mentor-photo-box">${photo}</div>
                        <div class="mentor-details">
                            <div class="mentor-name-text">${mentorName.value}</div>
                            <div class="mentor-handle-text"><a href="https://instagram.com/${mentorHandle.value.replace('@', '')}" target="_blank" style="color: inherit; text-decoration: none;">${mentorHandle.value}</a></div>
                            <ul class="mentor-bio">${fmtList(mentorBio.value, 'mentor-bio-point')}</ul>
                        </div>
                    </div>
                </div>
            </div>`;
        }

        // ——— INVESTIMENTO ———
        if (showInvestment.checked) {
            html += `
            <div class="slide">
                <div class="deco-corner-tl"></div>
                <div class="deco-glow-top"></div>
                <div class="slide-watermark">INVESTIMENTO</div>
                <div class="slide-content">
                    <div class="logo-triangle" style="margin: 0 auto 25px;"></div>
                    <div class="title-section accent-underline" style="margin-bottom: 20px;">INVESTIMENTO</div>
                    <div class="inv-box">${invText.value}</div>
                    
                    <div class="title-section accent-underline" style="font-size: 1.8rem; margin-bottom: 18px;">PRÉ-REQUISITOS</div>
                    <ul class="prereq-list">${reqText.value.split('\n').filter(i => i.trim()).map(i => `<li class="prereq-item"><div class="prereq-dot"></div>${i}</li>`).join('')}</ul>

                    <div class="title-section accent-underline" style="font-size: 1.8rem; margin-top: 30px; margin-bottom: 18px;">CONTATOS</div>
                    <div class="contact-info">${contactText.value.replace(/\n/g, '<br>')}</div>
                </div>
            </div>`;
        }

        // ——— OBRIGADO ———
        if (showThanks.checked) {
            html += `
            <div class="slide slide-thanks">
                <div class="deco-corner-tl"></div>
                <div class="deco-corner-br"></div>
                <div class="deco-glow-top"></div>
                <div class="slide-content">
                    <div style="flex:1; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center;">
                        <div class="thanks-big">OBRIGADO</div>
                        <div class="thanks-site">${thanksWebsite.value}</div>
                        <div class="thanks-sub">Sua transformação profissional começa aqui.</div>
                    </div>
                    <div class="thanks-footer-text">${thanksFooter.value}</div>
                    <div class="cover-logo-area" style="left: 50%; transform: translateX(-50%);">
                        ${logoHtml}
                    </div>
                </div>
            </div>`;
        }

        presentation.innerHTML = html;
    }

    // Listeners
    function attachListeners() {
        document.querySelectorAll('.sidebar input[type="text"], .sidebar textarea').forEach(inp => inp.addEventListener('input', renderSlides));
        document.querySelectorAll('.sidebar input[type="checkbox"]').forEach(inp => inp.addEventListener('change', renderSlides));
    }
    attachListeners();
    renderSlides();

    // ===========================
    // PDF DOWNLOAD
    // ===========================
    window.downloadPDF = async function () {
        const btn = document.getElementById('downloadBtn');
        const status = document.getElementById('downloadStatus');
        btn.disabled = true;
        btn.innerText = 'GERANDO...';
        status.innerText = 'Preparando slides...';

        try {
            const slides = document.querySelectorAll('#presentation .slide');
            if (!slides.length) { status.innerText = 'Nenhum slide.'; btn.disabled = false; btn.innerText = 'BAIXAR EM PDF'; return; }

            const W = 108;
            status.innerText = `Capturando 1 de ${slides.length}...`;

            const c0 = await html2canvas(slides[0], { scale: 2, useCORS: true, backgroundColor: '#0a0a0f', logging: false });
            const jsPDFLib = window.jspdf || window.jsPDF;
            if (!jsPDFLib) throw new Error('jsPDF não carregou. Recarregue a página.');
            const JsPDF = jsPDFLib.jsPDF || jsPDFLib;

            const H0 = (c0.height * W) / c0.width;
            const pdf = new JsPDF({ orientation: 'portrait', unit: 'mm', format: [W, H0] });
            pdf.addImage(c0.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, W, H0);

            for (let i = 1; i < slides.length; i++) {
                status.innerText = `Capturando ${i + 1} de ${slides.length}...`;
                const c = await html2canvas(slides[i], { scale: 2, useCORS: true, backgroundColor: '#0a0a0f', logging: false });
                const Hi = (c.height * W) / c.width;
                pdf.addPage([W, Hi], 'portrait');
                pdf.addImage(c.toDataURL('image/jpeg', 0.95), 'JPEG', 0, 0, W, Hi);
            }

            status.innerText = 'Salvando...';
            pdf.save('Apresentacao.pdf');
            status.innerText = 'PDF salvo com sucesso!';
        } catch (err) {
            console.error(err);
            status.innerText = 'Erro: ' + err.message;
        }
        btn.disabled = false;
        btn.innerText = 'BAIXAR EM PDF';
    };
});
