import { useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import api from "../../utils/api";

function SummaryDetail() {
    const { user } = useAuth();

    const fetchSummary = async () => {
        const res = await api.get('/resumo/2', {
            headers: {
                Authorization: `Bearer ${user?.access_token}`, // Inclui o token no header da requisição
              },
        })
        console.log(res.data)
    }

    useEffect(() => {
        fetchSummary()
    }, [])

  return (
    <div>SummaryDetail</div>
  )
}

export default SummaryDetail;