import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Form.js";
import Grid from "./components/Grid";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api, { getErrorMessage } from "./api/client";

const normalizeDate = (value) => {
    if (!value) {
        return "";
    }

    const text = String(value);

    if (/^\d{4}-\d{2}-\d{2}/.test(text)) {
        return text.slice(0, 10);
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "";
    }

    return date.toISOString().split("T")[0];
};

const normalizeUser = (user) => ({
    ...user,
    id: user?.id ?? user?.idusuario ?? user?.id_usuario,
    data_nascimento: normalizeDate(user?.data_nascimento),
});

const Page = styled.div`
    min-height: 100vh;
`;

const Wrapper = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    padding: 48px 24px 80px;
    display: flex;
    flex-direction: column;
    gap: 48px;
`;

const Hero = styled.section`
    display: grid;
    gap: 32px;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    align-items: center;
    padding: 32px;
    background: #ffffff;
    border-radius: 24px;
    box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
`;

const HeroContent = styled.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
`;

const BadgeRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
`;

const Badge = styled.span`
    padding: 6px 12px;
    border-radius: 999px;
    background: #eef2ff;
    color: #4338ca;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.02em;
`;

const HeroTitle = styled.h1`
    font-size: clamp(28px, 4vw, 40px);
    line-height: 1.2;
`;

const HeroSubtitle = styled.p`
    font-size: 16px;
    color: #475569;
    line-height: 1.7;
`;

const HeroActions = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
`;

const PrimaryButton = styled.a`
    padding: 12px 18px;
    border-radius: 12px;
    background: #4f46e5;
    color: #ffffff;
    font-weight: 600;
    transition: transform 0.2s ease, box-shadow 0.2s ease;

    &:hover {
        transform: translateY(-1px);
        box-shadow: 0 10px 24px rgba(79, 70, 229, 0.35);
    }
`;

const SecondaryButton = styled.a`
    padding: 12px 18px;
    border-radius: 12px;
    border: 1px solid #c7d2fe;
    color: #4338ca;
    font-weight: 600;
    background: #ffffff;
`;

const HeroCard = styled.div`
    background: linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%);
    border-radius: 20px;
    padding: 24px;
    display: grid;
    gap: 16px;
`;

const HeroCardTitle = styled.h3`
    font-size: 18px;
`;

const HeroCardList = styled.ul`
    list-style: none;
    display: grid;
    gap: 12px;
    color: #334155;
    font-size: 14px;
`;

const Section = styled.section`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const SectionHeader = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`;

const SectionTitle = styled.h2`
    font-size: 24px;
`;

const SectionSubtitle = styled.p`
    color: #64748b;
    line-height: 1.7;
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 18px;
`;

const Card = styled.div`
    background: #ffffff;
    border-radius: 18px;
    padding: 20px;
    border: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const CardTitle = styled.h3`
    font-size: 16px;
`;

const CardText = styled.p`
    color: #64748b;
    line-height: 1.6;
    font-size: 14px;
`;

const Metrics = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 16px;
`;

const MetricCard = styled.div`
    background: #0f172a;
    color: #ffffff;
    border-radius: 18px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 6px;
`;

const MetricValue = styled.span`
    font-size: 22px;
    font-weight: 700;
`;

const MetricLabel = styled.span`
    color: #cbd5f5;
    font-size: 13px;
`;

const EndpointList = styled.ul`
    list-style: none;
    display: grid;
    gap: 12px;
`;

const EndpointItem = styled.li`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    font-size: 14px;
`;

const MethodTag = styled.span`
    padding: 4px 10px;
    border-radius: 999px;
    background: #e2e8f0;
    font-weight: 700;
    font-size: 12px;
`;

const EndpointPath = styled.span`
    font-family: "Fira Code", "Consolas", monospace;
    color: #0f172a;
`;

const DemoCard = styled.div`
    background: #ffffff;
    border-radius: 24px;
    padding: 28px;
    box-shadow: 0 20px 50px rgba(15, 23, 42, 0.08);
    display: flex;
    flex-direction: column;
    gap: 24px;
`;

const DemoHeader = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
`;

const DemoTitle = styled.h3`
    font-size: 20px;
`;

const DemoMeta = styled.span`
    color: #64748b;
    font-size: 14px;
`;

const Footer = styled.footer`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 12px;
    color: #64748b;
    font-size: 13px;
`;

const apiHighlights = [
    {
        title: "Objetivo do produto",
        text: "Centralizar o cadastro de pessoas com um CRUD simples e seguro, servindo como vitrine de boas praticas de API e UI.",
    },
    {
        title: "Camada de dados",
        text: "Persistencia em MySQL com inicializacao automatica da tabela e limpeza controlada para testes rapidos.",
    },
    {
        title: "Experiencia do usuario",
        text: "Fluxo otimizado para cadastro, edicao e remocao sem recarregar a pagina.",
    },
];

const apiEndpoints = [
    { method: "GET", path: "/users", label: "Listar usuarios" },
    { method: "POST", path: "/users", label: "Criar usuario" },
    { method: "PUT", path: "/users/:id", label: "Atualizar usuario" },
    { method: "DELETE", path: "/users/:id", label: "Remover usuario" },
];

function App() {
    const [users, setUsers] = useState([]);
    const [onEdit, setOnEdit] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getUsers = async () => {
        setIsLoading(true);
        try {
            const res = await api.get("/");
            const data = Array.isArray(res.data) ? res.data : [];
            const normalized = data.map(normalizeUser);

            setUsers(
                normalized.sort((a, b) => String(a.nome).localeCompare(String(b.nome)))
            );
        } catch (error) {
            toast.error(getErrorMessage(error));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <Page>
                <Wrapper>
                    <Hero>
                        <HeroContent>
                            <BadgeRow>
                                <Badge>Full Stack</Badge>
                                <Badge>API + UI</Badge>
                                <Badge>MySQL</Badge>
                            </BadgeRow>
                            <HeroTitle>People Management API</HeroTitle>
                            <HeroSubtitle>
                                Projeto demonstrativo para portfolio focado em uma API de cadastro
                                de pessoas com interface moderna, fluxo direto e feedback em tempo real.
                            </HeroSubtitle>
                            <HeroActions>
                                <PrimaryButton href="#demo">Ver demonstracao</PrimaryButton>
                                <SecondaryButton href="#api">Documentacao rapida</SecondaryButton>
                            </HeroActions>
                        </HeroContent>
                        <HeroCard>
                            <HeroCardTitle>Visao geral</HeroCardTitle>
                            <HeroCardList>
                                <li>CRUD completo com validacoes.</li>
                                <li>Inicializacao automatica do banco.</li>
                                <li>Layout responsivo e focado em UX.</li>
                                <li>Reset de dados para testes rapidos.</li>
                            </HeroCardList>
                        </HeroCard>
                    </Hero>

                    <Section>
                        <SectionHeader>
                            <SectionTitle>Contexto do projeto</SectionTitle>
                            <SectionSubtitle>
                                Este sistema simula um dashboard de administracao para equipes que
                                precisam manter cadastros sempre atualizados, com foco em confiabilidade
                                dos dados e rapidez de uso.
                            </SectionSubtitle>
                        </SectionHeader>
                        <CardGrid>
                            {apiHighlights.map((item) => (
                                <Card key={item.title}>
                                    <CardTitle>{item.title}</CardTitle>
                                    <CardText>{item.text}</CardText>
                                </Card>
                            ))}
                        </CardGrid>
                    </Section>

                    <Section id="api">
                        <SectionHeader>
                            <SectionTitle>Visao da API</SectionTitle>
                            <SectionSubtitle>
                                Endpoints alinhados para integracao rapida com o frontend e testes em
                                ferramentas como Postman ou Insomnia.
                            </SectionSubtitle>
                        </SectionHeader>
                        <EndpointList>
                            {apiEndpoints.map((endpoint) => (
                                <EndpointItem key={endpoint.path + endpoint.method}>
                                    <MethodTag>{endpoint.method}</MethodTag>
                                    <EndpointPath>{endpoint.path}</EndpointPath>
                                    <span>{endpoint.label}</span>
                                </EndpointItem>
                            ))}
                        </EndpointList>
                    </Section>

                    <Section>
                        <SectionHeader>
                            <SectionTitle>Indicadores</SectionTitle>
                            <SectionSubtitle>
                                Status rapido da aplicacao e cobertura do fluxo de cadastro.
                            </SectionSubtitle>
                        </SectionHeader>
                        <Metrics>
                            <MetricCard>
                                <MetricValue>{users.length}</MetricValue>
                                <MetricLabel>Usuarios ativos</MetricLabel>
                            </MetricCard>
                            <MetricCard>
                                <MetricValue>{isLoading ? "Sincronizando" : "Online"}</MetricValue>
                                <MetricLabel>Estado da API</MetricLabel>
                            </MetricCard>
                            <MetricCard>
                                <MetricValue>CRUD</MetricValue>
                                <MetricLabel>Operacoes completas</MetricLabel>
                            </MetricCard>
                        </Metrics>
                    </Section>

                    <Section id="demo">
                        <SectionHeader>
                            <SectionTitle>Live Demo</SectionTitle>
                            <SectionSubtitle>
                                Cadastre, edite e gerencie pessoas em tempo real para demonstrar o
                                funcionamento da API.
                            </SectionSubtitle>
                        </SectionHeader>
                        <DemoCard>
                            <DemoHeader>
                                <DemoTitle>Cadastro de usuarios</DemoTitle>
                                <DemoMeta>
                                    {isLoading
                                        ? "Carregando dados..."
                                        : `${users.length} usuarios cadastrados`}
                                </DemoMeta>
                            </DemoHeader>
                            <Form onEdit={onEdit} setOnEdit={setOnEdit} getUsers={getUsers} />
                            <Grid
                                setOnEdit={setOnEdit}
                                users={users}
                                setUsers={setUsers}
                                loading={isLoading}
                            />
                        </DemoCard>
                    </Section>

                    <Footer>
                        <span>People Management API Portfolio</span>
                        <span>Stack: React, Node.js, Express, MySQL</span>
                    </Footer>
                </Wrapper>
            </Page>
            <ToastContainer autoClose={3000} position="bottom-left" />
            <GlobalStyle />
        </>
    );
}

export default App;
