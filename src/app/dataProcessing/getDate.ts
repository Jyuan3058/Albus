function getActiveDate(){
    const active = new Date();
    // get previous day due to not having current day from api
    const day = active.getDay()-1;
    // monday
    if (day === 0){active.setDate(active.getDate() - 3)};
    // sunday
    if (day === 6){active.setDate(active.getDate() - 2)};

    // y,m,d
    const m = String(active.getMonth()+1).padStart(2,"0");
    const d = String(active.getDate()).padStart(2,"0");
    return `${active.getFullYear()}-${m}-${d}`;
}

export default getActiveDate;