import { Flex, Text, Title } from "@mantine/core";

export function Summary() {
    return (
        <>
            <Flex mt={'lg'} direction={'column'}>
                <Title title="h3">Reunião de planejamento</Title>
                <Text>03/08/2024, Segunda-Feira - 10:00h</Text>
                <Flex 
                p={'md'} bg={'#161324'} direction={'column'} gap={'xs'}
                mt={'lg'}
                style={{borderRadius: '10px'}}
                >
                    <Title ta={'center'} fz={'lg'}>Reunião de planejamento</Title>
                    <Text c={'gray.3'}>
                    Apresentação dos resultados financeiros do último trimestre
                    O departamento apresentou os resultados financeiros referentes ao último trimestre, destacando um aumento de X% no faturamento em relação ao período anterior.
                    Houve uma redução de custos operacionais em Y%, refletindo as medidas de otimização implementadas no semestre passado.
                    Os principais indicadores financeiros, como lucro líquido e EBITDA, foram detalhados, evidenciando uma melhora contínua.
                    Revisão do orçamento para o próximo trimestre
                    Foi realizada uma revisão do orçamento para os próximos três meses, com ajustes pontuais em determinadas áreas, como marketing e TI, visando maior alocação de recursos para projetos estratégicos.
                    A equipe discutiu a necessidade de revisar a previsão de despesas com novos fornecedores, especialmente em função das negociações em andamento.
                    Análise de fluxos de caixa
                    O fluxo de caixa foi analisado em detalhe, e observou-se a necessidade de melhorias na gestão de recebíveis para reduzir o ciclo financeiro.
                    Foram propostas ações para melhorar o controle de inadimplência, com a criação de um plano de ação envolvendo o setor jurídico.
                    Discussão sobre novos investimentos
                    A reunião também abordou possíveis novos investimentos, especialmente em automação de processos financeiros e melhorias nos sistemas de relatórios.
                    Um comitê será formado para analisar o retorno sobre investimento (ROI) das novas ferramentas propostas.
                    Encaminhamentos:
                    [Inserir nome] será responsável por elaborar uma proposta de otimização dos fluxos de caixa até [inserir data].
                    O departamento de compras deverá iniciar negociações com novos fornecedores conforme os ajustes orçamentários.
                    A equipe de finanças vai realizar uma nova reunião em [inserir data] para revisar a proposta de investimento em tecnologia.
                    Conclusão: A reunião foi produtiva, e as metas para o próximo trimestre foram definidas com foco em manter a melhoria dos resultados financeiros, reduzir custos e otimizar processos internos.
                    </Text>
                </Flex>
            </Flex>
        </>
    )
}
