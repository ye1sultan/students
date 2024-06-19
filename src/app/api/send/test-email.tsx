interface EmailContentProps {
  name: string;
  email: string;
  message: string;
}

const EmailContent = ({ name, email, message }: EmailContentProps) => {
  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
      <h1 className="text-2xl font-bold mb-2">Cізге жана хабар!</h1>
      <div className="border-t border-gray-300 pt-4">
        <p className="text-gray-700 mb-2">Жіберген: {name}</p>
        <p className="text-gray-700 mb-2">Поштасы: {email}</p>
        <p className="text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default EmailContent;
