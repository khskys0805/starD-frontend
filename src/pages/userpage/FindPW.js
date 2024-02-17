import Header from "../../components/repeat_etc/Header";
import React, {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";


/*
2023-10-30 by jiruen 수정 중
 */

const FindPW = () => {

    const [state, setState] = useState({
            email: "",
            code: "",
        }
    );
    const [code, setCode] = useState("");
    const [findpw, setFindPw] = useState();
    const inputemail = useRef();
    const inputphone = useRef(); //인증 코드

    const navigate = useNavigate();
    const handleEditChange = (e) => { //핸들러 나누기
        // event handler
        console.log(e.target.value.toString());
        setState({
            ...state,
            [e.target.name]: e.target.value.toString(),
        });
    };

    const postCertificate = () => {
        console.log("인증번호 보내기");
        try {
                axios.post("http://localhost:8080/emails/verification-requests", {
                    email: state.email
                }).then((response) => {
                    console.log("인증번호 보내기 성공: ", response.data);
                    // 필요한 작업 수행
                }).catch((error) => {
                    console.log("인증번호 보내기 실패", error);
                });
            }
        catch (error) {
            console.error("Error:", error);
        }
    }
    const vaildateCertificate = () => {
        console.log(`인증번호 맞는지 아닌지 확인${state.code}`);

        // 첫 번째 요청: 이메일 및 인증 코드 확인
        axios.get("http://localhost:8080/emails/verifications", {
            params: {
                "email": state.email,
                "authCode": state.code,
            }
        }).then((response) => {
                console.log("인증번호 맞음: ", response);

                // 첫 번째 요청이 성공하면 두 번째 요청: 비밀번호 재설정 이메일 전송
                if (response.data === true) {
                    return axios.post("http://localhost:8080/find-password", {
                        email: state.email
                    }).then((response) => {
                        alert("비밀번호 재설정 이메일을 전송하였습니다. 해당 이메일을 확인해주세요.");
                        console.log("비밀번호 재설정 이메일 보내기 성공: ", response.data);

                    });
                } else {
                    alert("인증번호가 틀렸습니다.");
                    throw new Error("인증번호 확인에 실패했습니다.");
                }


        }).catch((error) => {
                console.error("에러:", error);
                // 요청 실패 또는 오류 발생 시 처리
            });
    }


    return (
        <div>
            <Header showSideCenter={false}/>
            <div className={"page_title"}>
                <p id={"find-id"}>비밀번호 찾기</p>
            </div>
            <div className="findwrap">
                <div className={"container_findwrap"}>
                    <div className="container_find" id="logs">
                        <div className="input_infos">
                            <div className="subinfos">이메일</div>
                            <div className="subinfos2">
                                <input
                                    ref={inputemail}
                                    name={"email"}
                                    placeholder="이메일을 입력해주세요"
                                    value={state.email}
                                    onChange={handleEditChange}
                                />
                                <div className={"Certification_Number1"}><button onClick={postCertificate}>전송</button></div>
                            </div>
                        </div>
                    </div>
                    <div className="container_find" id="phone">
                        <div className="input_phone">
                            <div className="subinfos">
                                인증번호
                            </div>
                            <div className={"inputform"}>
                                <input
                                    ref={inputphone}
                                    id="phonecontent"
                                    name={"code"}
                                    value={state.code}
                                    onChange={handleEditChange}
                                    placeholder={"인증번호를 입력해주세요."}
                                ></input>
                            </div>
                            <div className={"Certification_Number"}>
                                <button onClick={vaildateCertificate}>비밀번호 찾기</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};
export default FindPW;