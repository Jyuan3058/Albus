function getActiveDate(){
    const active = new Date();
    const day = active.getDay();
    if (day === 0){active.setDate(active.getDate() - 2)};
    if (day === 6){active.setDate(active.getDate() - 1)};

    // y,m,d
    const m = String(active.getMonth()+1).padStart(2,"0");
    const d = String(active.getDate()).padStart(2,"0");
    return `${active.getFullYear()}-${m}-${d}`;
}

export default getActiveDate;