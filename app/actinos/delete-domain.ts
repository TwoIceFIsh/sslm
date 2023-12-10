const deleteDomain = async (dId: string) => {
    if (confirm('정말로 삭제 할까요?')) {
        try {
            const response = await fetch(`/api/domain/${dId}/delete`);
            return response.ok;
        } catch (error) {
            return false;
        }
    }
};

export default deleteDomain;
