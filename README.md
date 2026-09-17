# feirasefestas
Site de feiras, festas e eventos em portugal

# 🎪 Feiras e Festas (`feirasefestas.pt`)

> A plataforma comunitária para descobrir feiras, mercados, romarias, festas e eventos locais por todo o país.

Plataforma *web* ultraleve, rápida e focada em dispositivos móveis, desenhada para ajudar os portugueses a responder à pergunta: **"O que há para fazer este fim de semana?"**.

---

## 🚀 Filosofia do Projeto

* **Zero Custos Fixos:** Construído sob uma arquitetura Jamstack para garantir custo €0/mês de alojamento e infraestrutura.
* **Privacidade & RGPD Zero-Dores:** Sem registo obrigatório para visitantes, sem rastreio de dados pessoais e sem *cookies* invasivos.
* **Mobile-First & Performance:** Carregamento em menos de 1 segundo em qualquer telemóvel via geração estática (SSG) e CDN global.
* **Comunitário & Atualizado:** Focado em eventos confirmados, com submissão direta por organizadores e feirantes.

---

## 🛠️ Tech Stack & Arquitetura

| Camada | Tecnologia | Plano / Limite Gratuito |
| :--- | :--- | :--- |
| **Frontend** | [Astro](https://astro.build/) + Tailwind CSS | Open Source |
| **Alojamento & CDN** | [Cloudflare Pages](https://pages.cloudflare.com/) | **Tráfego Ilimitado** |
| **Base de Dados** | [Supabase](https://supabase.com/) (PostgreSQL) | 500 MB (Centenas de milhar de registos) |
| **Armazenamento de Imagens** | Supabase Storage | 1 GB Gratuito |
| **DNS & SSL** | Cloudflare | Certificado HTTPS Gratuito |

---

## 🗄️ Esquema da Base de Dados (Supabase / PostgreSQL)

Para criar a estrutura inicial, executa o seguinte SQL no **SQL Editor** do teu painel Supabase:

```sql
-- Criar a tabela principal de eventos
create table public.eventos (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  descricao text,
  categoria text not null, -- 'feira', 'festa', 'circo_lazer', 'workshop'
  distrito text not null,
  concelho text not null,
  freguesia text,
  localizacao_nome text, -- Ex: "Praça do Município"
  data_inicio timestamp with time zone not null,
  data_fim timestamp with time zone,
  imagem_url text,
  preco text default 'Gratuito', -- 'Gratuito' ou 'Pago'
  destaque boolean default false, -- Para monetização (Premium)
  aprovado boolean default false, -- Moderado no painel Admin
  created_at timestamp with time zone default now()
);

-- Ativar Row Level Security (RLS)
alter table public.eventos enable row level security;

-- Política: Todos podem ver eventos aprovados
create policy "Eventos aprovados sao publicos" 
  on public.eventos for select 
  using (aprovado = true);

-- Política: Qualquer pessoa pode submeter um evento (fica pendente de aprovação)
create policy "Permitir submissao de eventos" 
  on public.eventos for insert 
  with check (aprovado = false);
