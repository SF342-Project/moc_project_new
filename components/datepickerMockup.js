const [startDate, setStartDate] = useState(new Date());
const [textStart, setTextStart] = useState('');
const [openStart, setOpenStart] = useState(false);

const [endDate, setEndDate] = useState(new Date());
const [textEnd, setTextEnd] = useState('');
const [openEnd, setOpenEnd] = useState(false);

const ConfirmDateStart = date => {
  setOpenStart(false);
  let tempDate = new Date(date);
  let day = tempDate.getDate().toLocaleString();
  let month = (tempDate.getMonth() + 1).toLocaleString();
  if (day.length == 1) {
    day = '0' + day;
  }
  if (month.length == 1) {
    month = '0' + month;
  }
  let formatDate = tempDate.getFullYear() + '-' + month + '-' + day;
  setTextStart(formatDate);
  setStartDate(date);
};

const ConfirmDateEnd = date => {
  setOpenEnd(false);
  let tempDate = new Date(date);
  let day = tempDate.getDate().toLocaleString();
  let month = (tempDate.getMonth() + 1).toLocaleString();
  if (day.length == 1) {
    day = '0' + day;
  }
  if (month.length == 1) {
    month = '0' + month;
  }
  let formatDate = tempDate.getFullYear() + '-' + month + '-' + day;
  setTextEnd(formatDate);
  setEndDate(date);
};

return(
    <View>
        <Button title="Open" onPress={() => setOpenStart(true)} />
        <Button title="Open" onPress={() => setOpenEnd(true)} />
        <DatePicker
          modal
          open={openStart}
          date={startDate}
          mode={"date"}
          onConfirm={date => ConfirmDateStart(date)}
          onCancel={() => {
            setOpenStart(false);
          }}
        />
        <DatePicker
          modal
          open={openEnd}
          date={endDate}
          mode={"date"}
          onConfirm={date => ConfirmDateEnd(date)}
          onCancel={() => {
            setOpenEnd(false);
          }}
        />
    </View>  
);