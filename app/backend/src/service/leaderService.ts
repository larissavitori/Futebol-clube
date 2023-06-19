import { ILeader } from '../Interfaces/Leaderboards/ILeader';
import { IMatche } from '../Interfaces/matches/IMatche';
import TeamModel from '../models/TeamsModel';
import MatcheModel from '../models/matchesModel';

export default class MatchService {
  constructor(
    private MatchModel = new MatcheModel(),
    private TeamsModel = new TeamModel(),
  ) { }

  /*   O time vitorioso: marcará +3 pontos;
  O time perdedor: marcará 0 pontos;
  Em caso de empate: ambos os times marcam +1 ponto. */
  private static getTotalPoints = (id: number, data: IMatche[]): number => {
    const fil = data.filter((e) => e.homeTeamId === id);
    let soma = 0;
    fil.forEach((a) => {
      if (a.homeTeamGoals > a.awayTeamGoals) {
        soma += 3;
      } if (a.homeTeamGoals === a.awayTeamGoals) {
        soma += 1;
      }
    });
    return soma;
  };

  private static total = (id:number, data: IMatche[]): number => {
    const fil = data.filter((e) => e.homeTeamId === id);
    return fil.length;
  };

  private static vitoria = (id:number, data: IMatche[]) => {
    const fil = data.filter((e) => e.homeTeamId === id);
    let vitoria = 0;
    fil.forEach((a) => {
      if (a.homeTeamGoals > a.awayTeamGoals) {
        vitoria += 1;
      }
    });
    return vitoria;
  };

  private static totalDraws = (id:number, data: IMatche[]) => {
    const fil = data.filter((e) => e.homeTeamId === id);
    let totalDraws = 0;
    fil.forEach((a) => {
      if (a.homeTeamGoals === a.awayTeamGoals) {
        totalDraws += 1;
      }
    });
    return totalDraws;
  };

  private static losses = (id:number, data: IMatche[]) => {
    const fil = data.filter((e) => e.homeTeamId === id);
    let losses = 0;
    fil.forEach((a) => {
      if (a.homeTeamGoals < a.awayTeamGoals) {
        losses += 1;
      }
    });
    return losses;
  };

  private static own = (id: number, data: IMatche[]) => {
    const fil = data.filter((e) => e.homeTeamId === id);
    let own = 0;
    fil.forEach((a) => {
      own += a.awayTeamGoals;
    });
    return own;
  };

  private static golsAfavor = (id: number, data: IMatche[]) => {
    const fil = data.filter((e) => e.homeTeamId === id);
    let gols = 0;
    fil.forEach((g) => {
      gols += g.homeTeamGoals;
    });
    return gols;
  };

  // [P / (J * 3)] * 100 monitoria mirela
  private static eficiencia = (id: number, data: IMatche[]) => {
    const totalPoint = MatchService.getTotalPoints(id, data);
    const test = MatchService.total(id, data) * 3;
    const test2 = totalPoint / test;
    const resu = (test2 * 100).toFixed(2).toString();
    return +resu;
  };

  /* Ordem para desempate
  1º Total de Vitórias;
  2º Saldo de gols;
  3º Gols a favor; */
  public ordernaçao = (partidas: ILeader[]) =>
    partidas.sort((ant, prox) => {
      let order = prox.totalPoints - ant.totalPoints;
      if (!order) {
        order = prox.totalVictories - ant.totalVictories;
      }
      if (!order) {
        order = prox.goalsBalance - ant.goalsBalance;
      }
      if (!order) {
        order = prox.goalsFavor - ant.goalsFavor;
      }
      return order;
    });

  public async getAllLeader(): Promise<ILeader[]> {
    const all = await this.MatchModel.findByQuery('false');
    const leader = await this.TeamsModel.findAll();
    const obj = leader.map((team) => ({
      name: team.teamName,
      totalPoints: MatchService.getTotalPoints(team.id, all),
      totalGames: MatchService.total(team.id, all),
      totalVictories: MatchService.vitoria(team.id, all),
      totalDraws: MatchService.totalDraws(team.id, all),
      totalLosses: MatchService.losses(team.id, all),
      goalsFavor: MatchService.golsAfavor(team.id, all),
      goalsOwn: MatchService.own(team.id, all),
      goalsBalance: MatchService.golsAfavor(team.id, all)
       - MatchService.own(team.id, all),
      efficiency: MatchService.eficiencia(team.id, all),
    }));
    const order = this.ordernaçao(obj);
    return order;
  }
}
