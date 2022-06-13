const errorConfigs = {
    // 파라미터 잘못됨 | 인증이 허가 안 됨 | 등등...
    E0000: { message: '원인을 알 수 없는 에러', status: 500 },
    E1000: {
        message: '요청 파라미터가 잘못되었습니다.',
        status: 400,
    },
}

export default errorConfigs
