import {Link} from "react-router-dom";
import {useState} from "react";

const AdminCategory = () => {
    // {onCategoryChange}
    // const handleCategoryClick = (category) => {
    //     onCategoryChange(category);
    // };
    const [page, setPage] = useState(1);

    return (
        <div className="category">
            <div className="c_01">
                <div className="sub_c">
                    <nav>
                        <ul>
                            <li>
                                <Link to={`/admin/MemberManagement`}
                                      style={{
                                          textDecoration: "none",
                                          color: "inherit"
                                      }}>
                                    회원 관리
                                </Link>
                            </li>
                            <li>
                                <Link to={`/admin/ReportManagement`}
                                      style={{
                                          textDecoration: "none",
                                          color: "inherit"
                                      }}>
                                    신고 관리
                                </Link>
                            </li>
                            <li>
                                <Link to={`/admin/FAQManagement/page=${page}`}
                                      page={page}
                                      style={{
                                          textDecoration: "none",
                                          color: "inherit"
                                      }}>
                                    FAQ 관리
                                </Link>
                            </li>
                            <li>
                                <Link to={`/admin/NoticeManagement/page=${page}`}
                                      page={page}
                                      style={{
                                          textDecoration: "none",
                                          color: "inherit"
                                      }}>
                                    공지사항 등록
                                </Link>

                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    )
}
export default AdminCategory;