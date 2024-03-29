
export const SUBMIT_PROFILE_STATUS = [
    { id: 0, name: "Nộp lưu hồ sơ" },
    { id: 1, name: "Thêm mới" },
    { id: 2, name: "Chờ đăng ký" },
    { id: 3, name: "Đã duyệt đăng kí" },
    { id: 4, name: "Yêu cầu bổ xung" },
    { id: 5, name: "Từ chối đăng ký" },
    { id: 6, name: "Chờ duyệt kết thúc" },
    { id: 7, name: "Đã duyệt kết thúc" },
    { id: 8, name: "Bổ xung kết thúc" },
    { id: 9, name: "Từ chối kết thúc" },

]


export const STATUS_ADD = [
    SUBMIT_PROFILE_STATUS[1].id,
    SUBMIT_PROFILE_STATUS[2].id,
    SUBMIT_PROFILE_STATUS[4].id,
    SUBMIT_PROFILE_STATUS[5].id,
];
export const STATUS_UPDATE = [
    SUBMIT_PROFILE_STATUS[1].id,
    SUBMIT_PROFILE_STATUS[3].id,
    SUBMIT_PROFILE_STATUS[4].id,
    SUBMIT_PROFILE_STATUS[5].id,
    SUBMIT_PROFILE_STATUS[8].id,
    SUBMIT_PROFILE_STATUS[9].id,
]

export const STATUS_DETAIL = [
    SUBMIT_PROFILE_STATUS[2].id,
    SUBMIT_PROFILE_STATUS[6].id,
    SUBMIT_PROFILE_STATUS[5].id,
    SUBMIT_PROFILE_STATUS[8].id,
    SUBMIT_PROFILE_STATUS[9].id,
]
export const STATUS_REMOVE = [SUBMIT_PROFILE_STATUS[1].id]

export const STATUS_APPROVED = [
    SUBMIT_PROFILE_STATUS[3].id,
    SUBMIT_PROFILE_STATUS[7].id,
    SUBMIT_PROFILE_STATUS[0].id,
]
export const STATUS_LEADER = [
    SUBMIT_PROFILE_STATUS[4].id,
    SUBMIT_PROFILE_STATUS[5].id,
]

export const SUBMIT_MANAGER_STATUS = [
    SUBMIT_PROFILE_STATUS[2].id,
    SUBMIT_PROFILE_STATUS[6].id,
]
export const STATUS_MANAGER_STAFF = [
    SUBMIT_PROFILE_STATUS[3].id,
    SUBMIT_PROFILE_STATUS[6].id,
    SUBMIT_PROFILE_STATUS[8].id,
    SUBMIT_PROFILE_STATUS[9].id,
]
export const STATUS_WIEW_MANAGER_STAFF = [
    SUBMIT_PROFILE_STATUS[6].id,
    SUBMIT_PROFILE_STATUS[8].id,
    SUBMIT_PROFILE_STATUS[9].id,
]
export const STATUS_NOTIFICATION_STAFF = [
    SUBMIT_PROFILE_STATUS[8].id,
    SUBMIT_PROFILE_STATUS[9].id,
]
export const STATUS_UPDATE_STAFF = [
    SUBMIT_PROFILE_STATUS[3].id,
    SUBMIT_PROFILE_STATUS[8].id,
    SUBMIT_PROFILE_STATUS[9].id,
]
export const STATUS_ADDITIONAL = [
    SUBMIT_PROFILE_STATUS[4].id,
    SUBMIT_PROFILE_STATUS[8].id,
]
export const STATUS_REJECT = [
    SUBMIT_PROFILE_STATUS[5].id,
    SUBMIT_PROFILE_STATUS[9].id,
]
export const STATUS_FOR_VIEW_PENDING = [
    SUBMIT_PROFILE_STATUS[2].id,
];
export const STATUS_VIEW_PROCESS = [
    SUBMIT_PROFILE_STATUS[2].id,
    SUBMIT_PROFILE_STATUS[3].id,
    SUBMIT_PROFILE_STATUS[4].id,
    SUBMIT_PROFILE_STATUS[5].id,
];
export const STATUS_EDIT_PROCESS = [
    SUBMIT_PROFILE_STATUS[1].id,
    SUBMIT_PROFILE_STATUS[4].id,
    SUBMIT_PROFILE_STATUS[5].id,
];
export const STAFF_STATUS = {
    MANAGE: "3,6,8,9",
    EDIT_PROCESS: "1,4,5",
    PENDING: "2,6",
    END_PROFILE_PROCESS: "6",
    VIEW_END_PROFILE: "7,0",
    EDIT_END_PROFILE: "7",
    VIEW_MANAGE: "2,3,4,5",
    VIEW_PENDING: "2",
    NEW: "1",
    ADD: "1,2,4,5",
    REMOVE: "1",
    EDIT: "1,4,5,3,8,9",
    VIEW: "2,6,3,8,9",
    APPROVED: "0,3,7",
    ADDITIONAL: "4,8",
    REJECT: "5,9",

}
export const FAMILY = [
    { id: 1, name: "Bố/Mẹ" },
    { id: 2, name: "Anh/Chị" },
    { id: 3, name: "EM" },
    { id: 4, name: "Vợ/Chồng" },
    { id: 5, name: "Họ hàng" },
    { id: 6, name: "Người bảo hộ" },
    { id: 7, name: "Khác" },
]

export const TEMA = [
    { id: 0, name: "FrontEnd - SPA.NET" },
    { id: 1, name: "FrontEnd - ReactJs" },
    { id: 2, name: "Tester" },
    { id: 3, name: "BackEnd" },
    { id: 4, name: "BA" },
    { id: 5, name: "Mobile" },
]

export const GENDER = [
    { id: 0, name: "Khác" },
    { id: 1, name: "Nam" },
    { id: 2, name: "Nữ" },
]

export const LEADERSHIP = [
    {
        "id": 36,
        "leaderName": "Nguyen Van B",
        "leaderPosition": 3,
        "activeStatus": 1,
        "userId": 7
    },
    {
        "id": 35,
        "leaderName": "Nguyen Van E",
        "leaderPosition": 3,
        "activeStatus": 2,
        "userId": 6
    },
    {
        "id": 34,
        "leaderName": "Nguyen Van D",
        "leaderPosition": 3,
        "activeStatus": 1,
        "userId": 5
    },
    {
        "id": 2,
        "leaderName": "Nguyen Van C",
        "leaderPosition": 2,
        "activeStatus": 1,
        "userId": 4
    },
    {
        "id": 1,
        "leaderName": "Nguyen Van A",
        "leaderPosition": 4,
        "activeStatus": 1,
        "userId": 3
    }
]
export const LEADER_POSITION = [
    { name: "Trường nhóm Front-End", id: 1 },
    { name: "Trường nhóm Back-End", id: 2 },
    { name: "Trường nhóm Tester", id: 3 },
    { name: "Trường nhóm BA", id: 4 },
    { name: "Trường nhóm Java", id: 5 },
]

export const TYPE_PROPOSAL = [
    { name: "Đề xuất tăng lương", id: 1 },
    { name: "Đề xuất giảm giờ làm", id: 2 },
    { name: "Đề xuất chế độ nghỉ", id: 3 },
    { name: "Đề xuất tăng giờ làm", id: 4 },
]
export const STAFF_POSITION = [
    { name: "Nhân viên", id: 1 },
    { name: "Phó nhóm", id: 2 },
    { name: "Trưởng nhóm", id: 3 },
    { name: "Phó phòng", id: 4 },
    { name: "Trưởng phòng", id: 5 },
    { name: "Phó giám đốc", id: 6 },
    { name: "Giám đốc", id: 7 },
]