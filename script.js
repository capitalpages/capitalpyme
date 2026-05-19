/* Capital Pyme 2.0 - JS compartido */

  // Navegación entre páginas (sitio multi-archivo)
  function showPage(pageId) {
    var map = {
      'landing': 'index.html',
      'onboarding': 'preevaluacion.html',
      'products': 'productos.html',
      'blog': 'aprende.html'
    };
    var dest = map[pageId] || 'index.html';
    if (dest) window.location.href = dest;
  }

  function goStep(n) {
    document.querySelectorAll('.ob-step').forEach(s => s.style.display = 'none');
    document.getElementById('ob-' + n).style.display = 'block';
    const steps = document.querySelectorAll('.progress-step');
    steps.forEach((s, i) => {
      s.classList.remove('active', 'done');
      if (i < n) s.classList.add('done');
      if (i === n) s.classList.add('active');
    });
  }

  document.querySelectorAll('.choice-card').forEach(c => {
    c.addEventListener('click', function() {
      this.parentElement.querySelectorAll('.choice-card').forEach(x => x.classList.remove('selected'));
      this.classList.add('selected');
    });
  });

  document.querySelectorAll('.filter-chip').forEach(c => {
    c.addEventListener('click', function() {
      this.parentElement.querySelectorAll('.filter-chip').forEach(x => x.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ====== CHAT BOT LOGIC ======
  function openChat() {
    document.getElementById('chatPanel').classList.add('open');
    document.getElementById('floatStack').style.display = 'none';
    document.querySelector('.float-badge').style.display = 'none';
  }
  function closeChat() {
    document.getElementById('chatPanel').classList.remove('open');
    document.getElementById('floatStack').style.display = 'flex';
  }
  function openWhatsApp() {
    // Demo: simula apertura WhatsApp Business
    const msg = encodeURIComponent("Hola Capital Pyme, vengo desde el sitio web y me gustaría conversar sobre financiamiento.");
    window.open('https://wa.me/56912345678?text=' + msg, '_blank');
  }

  function getTime() {
    const d = new Date();
    return String(d.getHours()).padStart(2,'0') + ':' + String(d.getMinutes()).padStart(2,'0');
  }

  function addMsg(text, who) {
    const body = document.getElementById('chatBody');
    const div = document.createElement('div');
    div.className = 'chat-msg ' + who;
    div.innerHTML = text + '<span class="ts">' + getTime() + '</span>';
    body.appendChild(div);
    body.scrollTop = body.scrollHeight;
  }

  function botReply(userText) {
    const t = userText.toLowerCase();
    let reply;
    if (t.includes('cómo funciona') || t.includes('como funciona')) {
      reply = 'Capital Pyme funciona en 5 pasos:<br><br>1️⃣ Subes tu carpeta tributaria SII<br>2️⃣ Tus últimos 3 balances<br>3️⃣ Carpetas de socios<br>4️⃣ Tipo de financiamiento que necesitas<br>5️⃣ Una breve descripción de tu negocio<br><br>En 48 horas recibes tu Ficha Financiera y te conectamos con el producto correcto. ¿Quieres empezar tu postulación?';
    } else if (t.includes('documento') || t.includes('necesito') || t.includes('papeles')) {
      reply = 'Solo necesitas 3 cosas:<br><br>📄 <b>Carpeta tributaria de la empresa</b> (descargable desde el SII)<br>📊 <b>Últimos 3 balances</b> (PDF o Excel)<br>👤 <b>Carpetas tributarias de los socios</b> con +10% de participación<br><br>El resto lo extraemos automáticamente. ¿Tienes todo a mano?';
    } else if (t.includes('honorario') || t.includes('cuesta') || t.includes('cobran') || t.includes('precio') || t.includes('comisión') || t.includes('comision')) {
      reply = 'Nuestros honorarios son variables según producto y se cobran <b>solo si la operación se cursa</b> (success fee):<br><br>💼 Crédito: <b>3% – 4%</b> + $250K apertura<br>📄 Factoring: <b>3%</b> + $150K<br>🚛 Leasing: <b>4% – 5%</b> + $300K<br>🛡️ Seguros: <b>15%</b> de la prima anual<br>📊 Tributarios: tarifa fija desde UF 8/mes<br><br>Sin éxito, sin cobro.';
    } else if (t.includes('crédito') || t.includes('credito') || t.includes('préstamo') || t.includes('prestamo')) {
      reply = '¡Genial! Para un crédito de capital de trabajo trabajamos con BancoEstado, BCI, Santander, Itaú y más. Tasas referenciales desde 1.3% mensual, con o sin garantía FOGAPE/FOGAIN.<br><br>Para darte una recomendación precisa necesito ver tu Ficha Financiera. ¿Te gustaría empezar tu postulación ahora?';
    } else if (t.includes('fogape') || t.includes('corfo') || t.includes('garantía') || t.includes('garantia')) {
      reply = 'FOGAPE es un fondo de garantía estatal que cubre hasta el <b>80% del crédito</b>. Sirve para que el banco te apruebe operaciones que sin garantía no aprobaría, especialmente si tienes poca trayectoria o sin avales potentes.<br><br>FOGAIN es similar pero para inversión productiva (no capital de trabajo). ¿Quieres que veamos cuál te conviene?';
    } else if (t.includes('factoring')) {
      reply = '📄 Factoring es ideal si tus clientes te pagan a 60-120 días. Te anticipamos hasta el 90% de tu factura en 24 horas.<br><br>Trabajamos con Factotal, BancoEstado Factoring, Tanner y otros. Comisiones desde 0.5% + IVA mensual.<br><br>¿Cuánto tienes hoy en facturas pendientes de cobro?';
    } else if (t.includes('hola') || t.includes('buenos') || t.includes('buenas')) {
      reply = '¡Hola de nuevo! 😊 ¿Cómo te puedo ayudar? Si quieres puedo orientarte sobre productos, requisitos o iniciar tu postulación.';
    } else if (t.includes('humano') || t.includes('ejecutivo') || t.includes('persona') || t.includes('hablar con')) {
      reply = '¡Por supuesto! Te derivo con un ejecutivo. Puedes <a onclick="openWhatsApp()" style="color: var(--cyan-dim); text-decoration: underline;">continuar por WhatsApp</a> o dejar tu número y te llamamos en menos de 1 hora hábil.';
    } else {
      reply = 'Gracias por tu consulta. Para responderte con precisión te derivo con un ejecutivo de nuestro equipo. ¿Prefieres <a onclick="openWhatsApp()" style="color: var(--cyan-dim); text-decoration: underline;">continuar por WhatsApp</a> o que te llamemos?';
    }
    setTimeout(() => addMsg(reply, 'bot'), 700);
  }

  function sendMsg() {
    const input = document.getElementById('chatInput');
    const text = input.value.trim();
    if (!text) return;
    addMsg(text, 'user');
    input.value = '';
    botReply(text);
  }
  function sendQuick(text) {
    addMsg(text, 'user');
    botReply(text);
    // Hide some quick buttons after click for cleaner UX
    document.getElementById('chatQuick').style.display = 'none';
  }
