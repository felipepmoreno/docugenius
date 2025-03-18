import React, { useRef } from 'react';
import GenieOrb from './GenieOrb';
import './LandingPage.scss';

const LandingPage = () => {
  const logoOrbRef = useRef(null);
  const heroOrbRef = useRef(null);

  return (
    <div className="landing-page">
      <header className="header">
        <div className="container">
          <nav className="nav">
            <div className="logo">
              <div className="orb-container">
              </div>
              <h1>DocuGenius <span>2.0</span></h1>
            </div>
            <div className="nav-links">
              <a href="#features" className="nav-link">Recursos</a>
              <a href="#how-it-works" className="nav-link">Como Funciona</a>
              <a href="#pricing" className="nav-link">Preços</a>
              <a href="#contact" className="nav-link btn btn-secondary">Contato</a>
              <a href="/login" className="btn btn-primary">Entrar</a>
              <a href="/app" className="btn btn-primary">Comece Agora</a>
              <a href="/app" className="btn btn-secondary">Ver Demo</a>
            </div>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>Documentação Inteligente para Projetos Completos</h1>
            <p>
              O DocuGenius utiliza inteligência artificial para analisar e documentar 
              automaticamente projetos de software inteiros, economizando horas de trabalho 
              e melhorando a qualidade da documentação.
            </p>
            <div className="hero-buttons">
              <a href="/signup" className="btn btn-primary">Comece Agora</a>
              <a href="#demo" className="btn btn-secondary">Ver Demo</a>
            </div>
          </div>
          <div className="hero-image">
            <div className="preview-container">
              <GenieOrb />
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <div className="container">
          <h2 className="section-title">Recursos Principais</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">📋</div>
              <h3>Análise de Projetos Completos</h3>
              <p>
                Processe múltiplos arquivos ou projetos inteiros via upload ou ZIP.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Detecção de Dependências</h3>
              <p>
                Identificação automática de relações e dependências entre arquivos.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏗️</div>
              <h3>Análise Arquitetural</h3>
              <p>
                Reconhecimento de padrões como MVC, Microsserviços e outros.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Multi-linguagem</h3>
              <p>
                Suporte para 13 linguagens diferentes, incluindo JavaScript, Python, Java e mais.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Documentação Contextual</h3>
              <p>
                Documentação que considera o propósito de cada componente no projeto.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Interface Interativa</h3>
              <p>
                Interface moderna com visualização 3D e edição em tempo real.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2 className="section-title">Como Funciona</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>Envie seu Código</h3>
              <p>
                Faça upload de arquivos individuais, múltiplos arquivos ou projetos ZIP.
              </p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>Análise Automática</h3>
              <p>
                Nossa IA analisa seu código, identifica estruturas e dependências.
              </p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>Geração de Documentação</h3>
              <p>
                Documentação completa é gerada para arquivos individuais e visão geral do projeto.
              </p>
            </div>
            <div className="step">
              <div className="step-number">4</div>
              <h3>Exportação & Uso</h3>
              <p>
                Exporte a documentação em formato Markdown para usar em seus projetos.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing">
        <div className="container">
          <h2 className="section-title">Planos e Preços</h2>
          <div className="pricing-grid">
            <div className="pricing-card">
              <h3 className="pricing-title">Free</h3>
              <div className="pricing-price">R$0</div>
              <ul className="pricing-features">
                <li>5 análises por mês</li>
                <li>Arquivos individuais apenas</li>
                <li>Suporte para 5 linguagens</li>
                <li>Análise básica de arquivo</li>
                <li>Exportação em Markdown</li>
              </ul>
              <a href="/signup" className="btn btn-secondary">Começar Grátis</a>
            </div>
            <div className="pricing-card pricing-card-featured">
              <div className="pricing-badge">Mais Popular</div>
              <h3 className="pricing-title">Pro</h3>
              <div className="pricing-price">R$49<span>/mês</span></div>
              <ul className="pricing-features">
                <li>50 análises por mês</li>
                <li>Análise de projetos completos</li>
                <li>Todas as 13 linguagens</li>
                <li>Detecção de arquitetura</li>
                <li>Exportação em múltiplos formatos</li>
                <li>Prioridade no suporte</li>
              </ul>
              <a href="/signup-pro" className="btn btn-primary">Escolher Pro</a>
            </div>
            <div className="pricing-card">
              <h3 className="pricing-title">Enterprise</h3>
              <div className="pricing-price">Personalizado</div>
              <ul className="pricing-features">
                <li>Análises ilimitadas</li>
                <li>Integração com GitHub/GitLab</li>
                <li>API dedicada</li>
                <li>Suporte prioritário</li>
                <li>Implantação na sua infraestrutura</li>
                <li>Personalização para sua empresa</li>
              </ul>
              <a href="/contact" className="btn btn-secondary">Entrar em Contato</a>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Entre em Contato</h2>
          <div className="contact-container">
            <div className="contact-info">
              <p>
                Tem dúvidas sobre como o DocuGenius pode ajudar você ou sua equipe?
                Entre em contato conosco e ficaremos felizes em ajudar.
              </p>
              <div className="contact-method">
                <div className="contact-icon">✉️</div>
                <div className="contact-detail">
                  <h4>Email</h4>
                  <p>contato@docugenius.com</p>
                </div>
              </div>
              <div className="contact-method">
                <div className="contact-icon">📞</div>
                <div class="contact-detail">
                  <h4>Telefone</h4>
                  <p>+55 (11) 99999-9999</p>
                </div>
              </div>
            </div>
            <form className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input type="text" id="name" name="name" placeholder="Seu nome" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" placeholder="Seu email" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Mensagem</label>
                <textarea id="message" name="message" rows="5" placeholder="Como podemos ajudar?"></textarea>
              </div>
              <button type="submit" className="btn btn-primary">Enviar Mensagem</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="logo">
                <h2>DocuGenius</h2>
              </div>
              <p>
                Documentação inteligente para desenvolvedores, gerando documentação 
                automática para seu código com inteligência artificial.
              </p>
            </div>
            <div className="footer-links">
              <h3>Links Rápidos</h3>
              <ul>
                <li><a href="#features">Recursos</a></li>
                <li><a href="#how-it-works">Como Funciona</a></li>
                <li><a href="#pricing">Preços</a></li>
                <li><a href="/docs">Documentação</a></li>
                <li><a href="/blog">Blog</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Suporte</h3>
              <ul>
                <li><a href="/faq">FAQ</a></li>
                <li><a href="/support">Suporte</a></li>
                <li><a href="/api">API</a></li>
                <li><a href="/status">Status</a></li>
              </ul>
            </div>
            <div className="footer-links">
              <h3>Legal</h3>
              <ul>
                <li><a href="/terms">Termos</a></li>
                <li><a href="/privacy">Privacidade</a></li>
                <li><a href="/security">Segurança</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 DocuGenius. Todos os direitos reservados.</p>
            <div className="social-links">
              <a href="https://linkedin.com" className="social-link">LinkedIn</a>
              <a href="https://github.com" className="social-link">GitHub</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;