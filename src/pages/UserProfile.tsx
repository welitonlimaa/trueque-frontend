import { useEffect, useState } from 'react';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';
import { deleteUser, getUserById, updateUserData, updateUserPassword } from '../api/users';
import { getCurrentUser } from '../utils/getCurrentUser';
import { UserResponseDTO } from '../types/api';
import StateCitySelect from '../components/StateCitySelect';

export default function UserProfile() {
  const [user, setUser] = useState<UserResponseDTO | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const userId = getCurrentUser()?.userId;

  useEffect(() => {
    if (!userId) return;
    getUserById(userId).then(setUser);
  }, [userId]);

  if (!user) return null;

  const isUserDataValid =
    user.name.trim() !== '' &&
    user.state?.trim() !== '' &&
    user.city?.trim() !== '';

  const isPasswordValid =
    passwordData.currentPassword.trim() !== '' &&
    passwordData.newPassword.trim() !== '';

  const handleUpdateData = async () => {
    if (!isUserDataValid) return;

    setLoading(true);
    try {
      const updated = await updateUserData(user.id, user);
      setUser(updated);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePassword = async () => {
    if (!isPasswordValid) return;

    setLoadingPassword(true);
    try {
      await updateUserPassword(user.id, passwordData);
      setPasswordData({ currentPassword: '', newPassword: '' });
    } finally {
      setLoadingPassword(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Deseja realmente deletar seu perfil?')) return;
    await deleteUser(user.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center py-10 px-4">
      <div className="w-full max-w-2xl space-y-6">

        {/* Dados */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <h1 className="text-lg font-semibold">Meus Dados</h1>

          <InputField
            required
            value={user.name}
            onChange={(e) => setUser({ ...user, name: e.target.value })}
            placeholder="Nome"
          />

          <InputField
            value={user.email}
            disabled
          />

          <InputField
            value={user.phone || ''}
            onChange={(e) => setUser({ ...user, phone: e.target.value })}
            placeholder="Telefone"
          />

          <StateCitySelect
            state={user.state}
            city={user.city}
            onChange={({ state, city }) =>
              setUser({ ...user, state, city })
            }
          />

          <Button
            loading={loading}
            disabled={!isUserDataValid}
            onClick={handleUpdateData}
          >
            Atualizar Dados
          </Button>
        </div>

        {/* Senha */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold">Atualizar Senha</h2>

          <InputField
            type="password"
            required
            placeholder="Senha Atual"
            value={passwordData.currentPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                currentPassword: e.target.value,
              })
            }
          />

          <InputField
            type="password"
            required
            placeholder="Nova Senha"
            value={passwordData.newPassword}
            onChange={(e) =>
              setPasswordData({
                ...passwordData,
                newPassword: e.target.value,
              })
            }
          />

          <Button
            loading={loadingPassword}
            disabled={!isPasswordValid}
            onClick={handleUpdatePassword}
          >
            Atualizar Senha
          </Button>
        </div>

        {/* Danger Zone */}
        <div className="bg-white border border-red-200 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-red-600">
            Atenção
          </h2>

          <Button variant="danger" onClick={handleDelete}>
            Deletar Perfil
          </Button>
        </div>

      </div>
    </div>
  );
}