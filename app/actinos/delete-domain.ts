const deleteDomain = async (dId: number) => {
    if (confirm('정말로 삭제 할까요?')) {
        try {
            const response = await fetch(`/api/sslm/domain/${dId}/delete`);
            return response.ok;
        } catch (error) {
            return false;
        }
    }
};

export default deleteDomain;