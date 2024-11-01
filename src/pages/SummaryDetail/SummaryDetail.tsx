import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function SummaryDetail() {
    const { user } = useAuth();

    const fetchSummary = async () => {
        const res = await axios.get('http://45.169.29.120:8000/resumo/2', {
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